import { asLegacyGlobalFunctionForExtensionApi } from "@kubesightapp/legacy-global-di";
import {
  type ResolveSystemProxy,
  resolveSystemProxyInjectionToken,
} from "../../common/utils/resolve-system-proxy/resolve-system-proxy-injection-token";

export type { ResolveSystemProxy };

/**
 * Resolves URL-specific proxy information from system. See more here: https://www.electronjs.org/docs/latest/api/session#sesresolveproxyurl
 * @param url - The URL for proxy information
 * @returns Promise for proxy information as string
 */
export const resolveSystemProxy = asLegacyGlobalFunctionForExtensionApi(resolveSystemProxyInjectionToken);
