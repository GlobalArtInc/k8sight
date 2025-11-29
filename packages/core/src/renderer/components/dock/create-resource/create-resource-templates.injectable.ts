import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import k8sightCreateResourceTemplatesInjectable from "./k8sight-templates.injectable";
import userCreateResourceTemplatesInjectable from "./user-templates.injectable";

import type { GroupBase } from "react-select";

export interface RawTemplate {
  label: string;
  value: string;
}
export interface RawTemplates {
  label: string;
  options: RawTemplate[];
}

const createResourceTemplatesInjectable = getInjectable({
  id: "create-resource-templates",

  instantiate: (di) => {
    const k8sightResourceTemplates = di.inject(k8sightCreateResourceTemplatesInjectable);
    const userResourceTemplates = di.inject(userCreateResourceTemplatesInjectable);

    return computed((): GroupBase<RawTemplate>[] => [...userResourceTemplates.get(), k8sightResourceTemplates]);
  },
});

export default createResourceTemplatesInjectable;
