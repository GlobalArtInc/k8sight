import { getGlobalOverride } from "@kubesightapp/test-utils";
import getHelmChartReadmeInjectable from "./get-helm-chart-readme.injectable";

export default getGlobalOverride(getHelmChartReadmeInjectable, () => () => {
  throw new Error("tried to get a helm chart's readme without overriding");
});
