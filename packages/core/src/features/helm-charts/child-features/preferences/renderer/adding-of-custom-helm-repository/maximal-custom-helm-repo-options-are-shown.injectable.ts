import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const maximalCustomHelmRepoOptionsAreShownInjectable = getInjectable({
  id: "maximal-custom-helm-repo-options-are-shown",
  instantiate: () => observable.box(false),
});

export default maximalCustomHelmRepoOptionsAreShownInjectable;
