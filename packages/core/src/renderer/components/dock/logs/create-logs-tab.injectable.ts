import { getInjectable } from "@ogre-tools/injectable";
import { runInAction } from "mobx";
import createDockTabInjectable from "../dock/create-dock-tab.injectable";
import { TabKind } from "../dock/store";
import dockStoreInjectable from "../dock/store.injectable";
import getRandomIdForPodLogsTabInjectable from "./get-random-id-for-pod-logs-tab.injectable";
import setLogTabDataInjectable from "./set-log-tab-data.injectable";
import logTabStoreInjectable from "./tab-store.injectable";

import type { DockStore, DockTab, DockTabCreate, TabId } from "../dock/store";
import type { LogTabData } from "./tab-store";

export type CreateLogsTabData = Pick<LogTabData, "owner" | "selectedPodId" | "selectedContainer" | "namespace"> &
  Omit<Partial<LogTabData>, "owner" | "selectedPodId" | "selectedContainer" | "namespace">;

interface Dependencies {
  createDockTab: (rawTabDesc: DockTabCreate, addNumber?: boolean) => DockTab;
  setLogTabData: (tabId: string, data: LogTabData) => void;
  getRandomId: () => string;
  dockStore: DockStore;
  logTabStore: { getData: (tabId: TabId) => LogTabData | undefined };
}

const createLogsTab =
  ({ createDockTab, setLogTabData, getRandomId, dockStore, logTabStore }: Dependencies) =>
  (title: string, data: CreateLogsTabData): TabId => {
    if (data.owner?.uid && data.owner?.kind && data.namespace) {
      for (const tab of dockStore.tabs) {
        if (tab.kind !== TabKind.POD_LOGS) {
          continue;
        }

        const tabData = logTabStore.getData(tab.id);

        if (
          tabData &&
          tabData.owner?.uid === data.owner.uid &&
          tabData.owner?.kind === data.owner.kind &&
          tabData.namespace === data.namespace
        ) {
          dockStore.open();
          dockStore.selectTab(tab.id);

          return tab.id;
        }
      }
    }

    const id = `log-tab-${getRandomId()}`;

    runInAction(() => {
      createDockTab(
        {
          id,
          title,
          kind: TabKind.POD_LOGS,
        },
        false,
      );
      setLogTabData(id, {
        showTimestamps: false,
        showPrevious: false,
        ...data,
      });
    });

    return id;
  };

const createLogsTabInjectable = getInjectable({
  id: "create-logs-tab",

  instantiate: (di) =>
    createLogsTab({
      createDockTab: di.inject(createDockTabInjectable),
      setLogTabData: di.inject(setLogTabDataInjectable),
      getRandomId: di.inject(getRandomIdForPodLogsTabInjectable),
      dockStore: di.inject(dockStoreInjectable),
      logTabStore: di.inject(logTabStoreInjectable),
    }),
});

export default createLogsTabInjectable;
