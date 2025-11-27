import { getInjectable } from "@ogre-tools/injectable";
import applicationMenuItemInjectionToken from "./application-menu-item-injection-token";

import type { OsActionMenuItem } from "./application-menu-item-injection-token";

const getApplicationMenuOperationSystemActionInjectable = ({ id, ...rest }: Omit<OsActionMenuItem, "kind">) =>
  getInjectable({
    id: `application-menu-operation-system-action/${id}`,

    instantiate: () => ({
      ...rest,
      id,
      kind: "os-action-menu-item" as const,
    }),

    injectionToken: applicationMenuItemInjectionToken,
  });

export { getApplicationMenuOperationSystemActionInjectable };
