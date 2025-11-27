import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

import type { KubeApiResourceDescriptor } from "../../../../common/rbac";

export const shouldShowResourceInjectionToken = getInjectionToken<IComputedValue<boolean>, KubeApiResourceDescriptor>({
  id: "should-show-resource",
});
