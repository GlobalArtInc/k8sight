import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import weblinksStateInjectable from "./state.injectable";

export type RemoveWeblink = (id: string) => void;

const removeWeblinkInjectable = getInjectable({
  id: "remove-weblink",
  instantiate: (di): RemoveWeblink => {
    const state = di.inject(weblinksStateInjectable);

    return action((id) => state.delete(id));
  },
});

export default removeWeblinkInjectable;
