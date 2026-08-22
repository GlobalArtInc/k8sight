import { getGlobalOverride } from "@kubesightapp/test-utils";
import mcpSecretCipherInjectable from "./secret-cipher.injectable";

export default getGlobalOverride(mcpSecretCipherInjectable, () => ({
  encrypt: (secret) => secret,
  decrypt: (stored) => stored,
}));
