import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

export type HelmRepositoriesErrorState = { controlsAreShown: true } | { controlsAreShown: false; errorMessage: string };

const helmRepositoriesErrorStateInjectable = getInjectable({
  id: "helm-repositories-error-state",

  instantiate: () => observable.box<HelmRepositoriesErrorState>({ controlsAreShown: true }),
});

export default helmRepositoriesErrorStateInjectable;
