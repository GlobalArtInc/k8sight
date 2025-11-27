import { getGlobalOverride } from "@kubesightapp/test-utils";
import openLinkInBrowserInjectable from "./open-link-in-browser.injectable";

export default getGlobalOverride(openLinkInBrowserInjectable, () => async () => {});
