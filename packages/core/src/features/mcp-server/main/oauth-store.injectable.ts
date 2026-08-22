import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import directoryForUserDataInjectable from "../../../common/app-paths/directory-for-user-data/directory-for-user-data.injectable";
import pathExistsSyncInjectable from "../../../common/fs/path-exists-sync.injectable";
import readJsonSyncInjectable from "../../../common/fs/read-json-sync.injectable";
import writeJsonSyncInjectable from "../../../common/fs/write-json-sync.injectable";
import joinPathsInjectable from "../../../common/path/join-paths.injectable";
import mcpSecretCipherInjectable from "./secret-cipher.injectable";

/**
 * A client the user let in, as it is kept on disk.
 *
 * `clientSecret` and `refreshTokens` are sealed by the secret cipher; everything else is plain so
 * the file stays readable when someone has to work out what is connected.
 */
export interface McpStoredClient {
  clientId: string;
  clientSecret?: string;
  name: string;
  redirectUris: string[];
  clientUri?: string;
  tokenEndpointAuthMethod: string;
  registeredAt: number;
  approvedAt?: number;
  refreshTokens: string[];
}

export interface McpOAuthStore {
  list: () => McpStoredClient[];
  get: (clientId: string) => McpStoredClient | undefined;
  add: (client: McpStoredClient) => void;
  approve: (clientId: string) => void;
  remove: (clientId: string) => boolean;
  addRefreshToken: (clientId: string, refreshToken: string) => void;
  /** Finds the owner of a refresh token and drops the token, since every use rotates it. */
  consumeRefreshToken: (refreshToken: string) => McpStoredClient | undefined;
  dropRefreshToken: (refreshToken: string) => void;
}

interface StoredModel {
  version: 1;
  clients: McpStoredClient[];
}

/**
 * A client that registered but never got a yes is dead weight; a client mid-flow when the app was
 * closed is not. Keeping the unapproved ones for a day covers the second without hoarding the first.
 */
const unapprovedLifetimeMs = 24 * 60 * 60 * 1000;

const maxRefreshTokensPerClient = 5;

const storeFileName = "mcp-oauth-clients.json";

/**
 * Owns the OAuth state that has to outlive a restart: which clients the user approved, and their
 * refresh tokens. Access tokens are deliberately absent -- they are cheap to mint again from a
 * refresh token, so nothing that grants cluster access longer than an hour sits in memory only.
 *
 * Main-process only, and never handed to the renderer: what Preferences shows goes through a
 * request channel that returns only the harmless fields.
 */
const mcpOAuthStoreInjectable = getInjectable({
  id: "mcp-oauth-store",

  instantiate: (di): McpOAuthStore => {
    const logger = di.inject(loggerInjectionToken);
    const cipher = di.inject(mcpSecretCipherInjectable);
    const joinPaths = di.inject(joinPathsInjectable);
    const readJsonSync = di.inject(readJsonSyncInjectable);
    const writeJsonSync = di.inject(writeJsonSyncInjectable);
    const pathExistsSync = di.inject(pathExistsSyncInjectable);

    /*
     * Resolved on first use rather than up front: the user data directory is only known once the
     * app has set its paths, and this store is built as part of the endpoint, well before that.
     */
    let cachedFilePath: string | undefined;

    const getFilePath = () =>
      (cachedFilePath ??= joinPaths(di.inject(directoryForUserDataInjectable), storeFileName));

    let clients: McpStoredClient[] | undefined;

    const seal = (client: McpStoredClient): McpStoredClient => ({
      ...client,
      clientSecret: client.clientSecret && cipher.encrypt(client.clientSecret),
      refreshTokens: client.refreshTokens.map((token) => cipher.encrypt(token)),
    });

    const unseal = (client: McpStoredClient): McpStoredClient => ({
      ...client,
      clientSecret: client.clientSecret ? cipher.decrypt(client.clientSecret) : undefined,
      // A secret sealed with a keyring we no longer have is not recoverable, so it simply goes.
      refreshTokens: client.refreshTokens
        .map((token) => cipher.decrypt(token))
        .filter((token): token is string => Boolean(token)),
    });

    const save = () => {
      try {
        writeJsonSync(getFilePath(), {
          version: 1,
          clients: (clients ?? []).map(seal),
        } satisfies StoredModel);
      } catch (error) {
        logger.error(`[MCP-SERVER]: could not persist authorized clients: ${error}`);
      }
    };

    const load = (): McpStoredClient[] => {
      if (clients) {
        return clients;
      }

      clients = [];

      if (!pathExistsSync(getFilePath())) {
        return clients;
      }

      try {
        const model = readJsonSync(getFilePath()) as Partial<StoredModel>;
        const cutoff = Date.now() - unapprovedLifetimeMs;

        clients = (model.clients ?? [])
          .filter((client) => client.approvedAt !== undefined || client.registeredAt > cutoff)
          .map(unseal);
      } catch (error) {
        // A corrupt file must not lock the user out of the app; they can authorize again.
        logger.error(`[MCP-SERVER]: could not read ${getFilePath()}, starting with no authorized clients: ${error}`);
      }

      return clients;
    };

    return {
      list: () => [...load()],

      get: (clientId) => load().find((client) => client.clientId === clientId),

      add: (client) => {
        load().push(client);
        save();
      },

      approve: (clientId) => {
        const client = load().find((it) => it.clientId === clientId);

        if (client) {
          client.approvedAt = Date.now();
          save();
        }
      },

      remove: (clientId) => {
        const remaining = load().filter((client) => client.clientId !== clientId);
        const removed = remaining.length !== load().length;

        clients = remaining;

        if (removed) {
          save();
        }

        return removed;
      },

      addRefreshToken: (clientId, refreshToken) => {
        const client = load().find((it) => it.clientId === clientId);

        if (client) {
          /*
           * Rotation replaces the token in use, but a client that authorizes repeatedly leaves the
           * older ones behind; keeping only the last few stops that growing without bound.
           */
          client.refreshTokens = [...client.refreshTokens, refreshToken].slice(-maxRefreshTokensPerClient);
          save();
        }
      },

      consumeRefreshToken: (refreshToken) => {
        const client = load().find((it) => it.refreshTokens.includes(refreshToken));

        if (client) {
          client.refreshTokens = client.refreshTokens.filter((token) => token !== refreshToken);
          save();
        }

        return client;
      },

      dropRefreshToken: (refreshToken) => {
        const client = load().find((it) => it.refreshTokens.includes(refreshToken));

        if (client) {
          client.refreshTokens = client.refreshTokens.filter((token) => token !== refreshToken);
          save();
        }
      },
    };
  },
});

export default mcpOAuthStoreInjectable;
