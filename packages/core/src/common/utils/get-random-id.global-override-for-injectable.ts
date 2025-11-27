import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getGlobalOverride } from "@kubesightapp/test-utils";

export default getGlobalOverride(getRandomIdInjectionToken, () => () => "some-irrelevant-random-id");
