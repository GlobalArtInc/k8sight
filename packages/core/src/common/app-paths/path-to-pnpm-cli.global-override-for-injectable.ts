import { getGlobalOverride } from "@kubesightapp/test-utils";
import pathToPnpmCliInjectable from "./path-to-pnpm-cli.injectable";

export default getGlobalOverride(pathToPnpmCliInjectable, () => "node_modules/pnpm/bin/pnpm.cjs");
