import { getInjectionToken } from "@ogre-tools/injectable";

export type ResolveSystemProxy = (url: string) => Promise<string>;

export const resolveSystemProxyInjectionToken = getInjectionToken<ResolveSystemProxy>({
  id: "resolve-system-proxy",
});
