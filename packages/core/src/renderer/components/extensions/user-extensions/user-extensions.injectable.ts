import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import extensionLoaderInjectable from "../../../../extensions/extension-loader/extension-loader.injectable";

const userExtensionsInjectable = getInjectable({
  id: "user-extensions",

  instantiate: (di) => {
    const extensionLoader = di.inject(extensionLoaderInjectable);

    return computed(() => [...extensionLoader.userExtensions.get().values()]);
  },
});

export default userExtensionsInjectable;
