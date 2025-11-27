import { getInjectable } from "@ogre-tools/injectable";
import createStorageInjectable from "../../../utils/create-storage/create-storage.injectable";
import { CreateResourceTabStore } from "./store";

const createResourceTabStoreInjectable = getInjectable({
  id: "create-resource-tab-store",

  instantiate: (di) =>
    new CreateResourceTabStore({
      createStorage: di.inject(createStorageInjectable),
    }),
});

export default createResourceTabStoreInjectable;
