import { getInjectionToken } from "@ogre-tools/injectable";

export interface NavigateToUrlOptions {
  withoutAffectingBackButton?: boolean;
  forceRootFrame?: boolean;
}

export type NavigateToUrl = (url: string, options?: NavigateToUrlOptions) => void;

export const navigateToUrlInjectionToken = getInjectionToken<NavigateToUrl>({ id: "navigate-to-url-injection-token" });
