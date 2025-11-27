import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { Disposer } from "@kubesightapp/utilities";

import type { WebLink } from "../../../common/catalog-entities";

const weblinkVerificationsInjectable = getInjectable({
  id: "weblink-verifications",
  instantiate: () => observable.map<string, [WebLink, Disposer]>(),
});

export default weblinkVerificationsInjectable;
