import { sidebarItemsInjectable } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";

const siblingTabsInjectable = getInjectable({
  id: "sibling-tabs",

  instantiate: (di) => {
    const sidebarItems = di.inject(sidebarItemsInjectable);

    return computed(
      () =>
        sidebarItems
          .get()
          .find(({ isActive }) => isActive.get())
          ?.children.filter(({ isVisible }) => isVisible.get()) ?? [],
    );
  },
});

export default siblingTabsInjectable;
