import { getGlobalOverride } from "@kubesightapp/test-utils";
import windowLocationInjectable from "./window-location.injectable";

export default getGlobalOverride(windowLocationInjectable, () => ({
  host: "localhost",
  port: "12345",
}));
