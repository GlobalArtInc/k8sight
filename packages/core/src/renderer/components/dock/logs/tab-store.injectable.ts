import { getInjectable } from "@ogre-tools/injectable";
import createStorageInjectable from "../../../utils/create-storage/create-storage.injectable";
import { LogTabStore } from "./tab-store";

const logTabStoreInjectable = getInjectable({
  id: "log-tab-store",

  instantiate: (di) =>
    new LogTabStore({
      createStorage: di.inject(createStorageInjectable),
    }),
});

export default logTabStoreInjectable;
