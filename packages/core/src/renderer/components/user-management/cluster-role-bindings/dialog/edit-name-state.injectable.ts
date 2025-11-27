import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const editClusterRoleBindingNameStateInjectable = getInjectable({
  id: "edit-cluster-role-binding-name-state",
  instantiate: () => observable.box(""),
});

export default editClusterRoleBindingNameStateInjectable;
