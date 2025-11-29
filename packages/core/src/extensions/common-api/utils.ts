import {
  asLegacyGlobalFunctionForExtensionApi,
  getLegacyGlobalDiForExtensionApi,
} from "@kubesightapp/legacy-global-di";
import * as utilities from "@kubesightapp/utilities";
import openLinkInBrowserInjectable, {
  type OpenLinkInBrowser,
} from "../../common/utils/open-link-in-browser.injectable";
import { buildVersionInitializable } from "../../features/vars/build-version/common/token";

export type { OpenLinkInBrowser };

const Util = {
  ...utilities,

  openExternal: asLegacyGlobalFunctionForExtensionApi(openLinkInBrowserInjectable),
  openBrowser: asLegacyGlobalFunctionForExtensionApi(openLinkInBrowserInjectable),

  getAppVersion: () => {
    const di = getLegacyGlobalDiForExtensionApi();

    return di.inject(buildVersionInitializable.stateToken);
  },
};

export { Util };
