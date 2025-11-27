import { getGlobalOverride } from "@kubesightapp/test-utils";
import { computed } from "mobx";
import execHelmEnvInjectable from "./exec-env.injectable";

export default getGlobalOverride(execHelmEnvInjectable, () => computed(() => ({})));
