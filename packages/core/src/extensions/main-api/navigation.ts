import { getEnvironmentSpecificLegacyGlobalDiForExtensionApi } from "@kubesightapp/legacy-global-di";
import navigateInjectable from "../../main/start-main-application/lens-window/navigate.injectable";

export function navigate(url: string) {
  const di = getEnvironmentSpecificLegacyGlobalDiForExtensionApi("main");
  const navigate = di.inject(navigateInjectable);

  return navigate(url);
}
