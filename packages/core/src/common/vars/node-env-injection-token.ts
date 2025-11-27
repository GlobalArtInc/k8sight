import { getInjectionToken } from "@ogre-tools/injectable";

export const nodeEnvInjectionToken = getInjectionToken<string | undefined>({
  id: "node-env-injection-token",
});

export default nodeEnvInjectionToken;
