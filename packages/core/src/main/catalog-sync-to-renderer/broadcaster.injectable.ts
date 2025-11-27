import { getInjectable } from "@ogre-tools/injectable";
import { debounce } from "lodash";
import broadcastMessageInjectable from "../../common/ipc/broadcast-message.injectable";
import { catalogItemsChannel } from "../../common/ipc/catalog";

import type { CatalogEntity } from "../../common/catalog";

const catalogSyncBroadcasterInjectable = getInjectable({
  id: "catalog-sync-broadcaster",
  instantiate: (di) => {
    const broadcastMessage = di.inject(broadcastMessageInjectable);

    return debounce(
      (items: CatalogEntity[]) => {
        broadcastMessage(catalogItemsChannel, items);
      },
      100,
      {
        leading: true,
        trailing: true,
      },
    );
  },
});

export default catalogSyncBroadcasterInjectable;
