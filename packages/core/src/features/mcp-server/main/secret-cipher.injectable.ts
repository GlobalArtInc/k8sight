import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { safeStorage } from "electron";

export interface McpSecretCipher {
  encrypt: (secret: string) => string;
  decrypt: (stored: string) => string | undefined;
}

/**
 * Marks a stored value as ciphertext. Anything without it is read back as-is, which covers machines
 * where safeStorage has nothing to key off.
 */
const encryptedPrefix = "safeStorage.v1:";

/**
 * Seals the long-lived secrets of the OAuth store -- client secrets and refresh tokens -- so a
 * file that survives across restarts is not a plaintext key to every cluster the user has.
 */
const mcpSecretCipherInjectable = getInjectable({
  id: "mcp-secret-cipher",

  instantiate: (di): McpSecretCipher => {
    const logger = di.inject(loggerInjectionToken);

    return {
      encrypt: (secret) => {
        /*
         * Without an OS keyring (a bare Linux session, say) safeStorage would either throw or
         * "encrypt" with a well-known key. Storing plaintext there is no worse and keeps the
         * endpoint usable -- the file is in the user's own data directory either way.
         */
        if (!safeStorage.isEncryptionAvailable()) {
          logger.warn("[MCP-SERVER]: OS encryption unavailable, storing client secrets in plain text");

          return secret;
        }

        return `${encryptedPrefix}${safeStorage.encryptString(secret).toString("base64")}`;
      },

      decrypt: (stored) => {
        if (!stored.startsWith(encryptedPrefix)) {
          return stored;
        }

        try {
          return safeStorage.decryptString(Buffer.from(stored.slice(encryptedPrefix.length), "base64"));
        } catch (error) {
          // A keyring the secret was not sealed with: it is unrecoverable, so the client re-authorizes.
          logger.error(`[MCP-SERVER]: could not decrypt a stored secret: ${error}`);

          return undefined;
        }
      },
    };
  },

  causesSideEffects: true,
});

export default mcpSecretCipherInjectable;
