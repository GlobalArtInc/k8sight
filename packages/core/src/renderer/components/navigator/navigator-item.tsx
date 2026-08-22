import { Icon } from "@kubesightapp/icon";
import { cssNames } from "@kubesightapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import sidebarStorageInjectable from "../layout/sidebar-storage/sidebar-storage.injectable";
import styles from "./navigator.module.scss";

import type { ClusterId } from "../../../common/cluster-types";
import type { FrameState } from "../../../features/dashboard-tabs/renderer/frame-states.injectable";
import type { StorageLayer } from "../../utils/storage-helper";
import type { SidebarStorageState } from "../layout/sidebar-storage/sidebar-storage.injectable";
import type { NavigatorNode } from "./navigator-nodes";

export interface NavigatorItemProps {
  clusterId: ClusterId;
  item: NavigatorNode;
  /** What the cluster's frame reports; here only to tell which row is the page it is showing. */
  state: FrameState;
  depth: number;
  onSelect: (itemId: string) => void;
}

interface Dependencies {
  sidebarStorage: StorageLayer<SidebarStorageState>;
}

const NonInjectedNavigatorItem = observer(
  ({ clusterId, item, state, depth, onSelect, sidebarStorage }: NavigatorItemProps & Dependencies) => {
    const expansionKey = `${clusterId}:${item.id}`;
    const isExpandable = item.children.length > 0;
    const isActive = state.activeItemIds.has(item.id);
    // A section containing the current page opens itself, so the page is never hidden from view.
    const isExpanded = sidebarStorage.get().expanded[expansionKey] ?? isActive;

    const toggleExpand = () =>
      sidebarStorage.merge((draft) => {
        draft.expanded[expansionKey] = !isExpanded;
      });

    return (
      <div className={styles.item} data-testid={`navigator-item-${clusterId}-${item.id}`}>
        <button
          type="button"
          className={cssNames(styles.itemRow, { [styles.itemActive]: isActive && !isExpandable })}
          style={{ paddingInlineStart: `${8 + (depth - 1) * 18}px` }}
          onClick={() => (isExpandable ? toggleExpand() : onSelect(item.id))}
        >
          <span className={styles.chevronSlot}>
            {isExpandable && (
              <Icon material={isExpanded ? "expand_more" : "chevron_right"} small className={styles.chevron} />
            )}
          </span>

          {/* Only the top level carries icons; nested pages read as a plain list under their section. */}
          {depth === 1 && item.getIcon?.()}

          <span className={styles.itemTitle}>{item.title}</span>
        </button>

        {isExpandable && isExpanded && (
          <div className={styles.children}>
            {item.children.map((child) => (
              <NavigatorItem
                key={child.id}
                clusterId={clusterId}
                item={child}
                state={state}
                depth={depth + 1}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

export const NavigatorItem = withInjectables<Dependencies, NavigatorItemProps>(NonInjectedNavigatorItem, {
  getProps: (di, props) => ({
    ...props,
    sidebarStorage: di.inject(sidebarStorageInjectable),
  }),
});

NavigatorItem.displayName = "NavigatorItem";
