import { getLegacyGlobalDiForExtensionApi } from "@kubesightapp/legacy-global-di";
import { clusterSetFrameIdHandler, clusterStates, clusterUnsetFrameIdChannel } from "../../common/ipc/cluster";
import { extensionDiscoveryStateChannel, extensionLoaderFromMainChannel } from "../../common/ipc/extension-handling";
import {
  type WindowAction,
  windowActionHandleChannel,
  windowLocationChangedChannel,
  windowOpenAppMenuAsContextMenuChannel,
} from "../../common/ipc/window";
import { toJS } from "../../common/utils";
import ipcRendererInjectable from "../utils/channel/ipc-renderer.injectable";

import type { InstalledExtension, K8sightExtensionId } from "@kubesightapp/legacy-extensions";

import type { Location } from "history";

import type { ClusterId, ClusterState } from "../../common/cluster-types";

function requestMain(channel: string, ...args: any[]) {
  const di = getLegacyGlobalDiForExtensionApi();

  const ipcRenderer = di.inject(ipcRendererInjectable);

  return ipcRenderer.invoke(channel, ...args.map(toJS));
}

function emitToMain(channel: string, ...args: any[]) {
  const di = getLegacyGlobalDiForExtensionApi();

  const ipcRenderer = di.inject(ipcRendererInjectable);

  return ipcRenderer.send(channel, ...args.map(toJS));
}

export function emitOpenAppMenuAsContextMenu(): void {
  emitToMain(windowOpenAppMenuAsContextMenuChannel);
}

export function emitWindowLocationChanged(location: Location): void {
  emitToMain(windowLocationChangedChannel, location);
}

export function requestWindowAction(type: WindowAction): Promise<void> {
  return requestMain(windowActionHandleChannel, type);
}

export function requestSetClusterFrameId(clusterId: ClusterId): Promise<void> {
  return requestMain(clusterSetFrameIdHandler, clusterId);
}

/**
 * Lets go of this frame's slot in the main process's frame registry as the frame is torn down, so
 * later broadcasts are not aimed at a frame that no longer exists.
 */
export function emitUnsetClusterFrameId(): void {
  emitToMain(clusterUnsetFrameIdChannel);
}

export function requestInitialClusterStates(): Promise<{ id: string; state: ClusterState }[]> {
  return requestMain(clusterStates);
}

export function requestInitialExtensionDiscovery(): Promise<{ isLoaded: boolean }> {
  return requestMain(extensionDiscoveryStateChannel);
}

export function requestExtensionLoaderInitialState(): Promise<[K8sightExtensionId, InstalledExtension][]> {
  return requestMain(extensionLoaderFromMainChannel);
}
