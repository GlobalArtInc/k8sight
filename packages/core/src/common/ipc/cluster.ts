export const clusterSetFrameIdHandler = "cluster:set-frame-id";
export const clusterVisibilityHandler = "cluster:visibility";
export const clusterStates = "cluster:states";
export const clusterRefreshAccessibilityChannel = "cluster:refresh-accessibility";

/**
 * This channel is broadcast on whenever the cluster fails to list namespaces
 * during a refresh and no `accessibleNamespaces` have been set.
 */
export const clusterListNamespaceForbiddenChannel = "cluster:list-namespace-forbidden";

export type ListNamespaceForbiddenArgs = [clusterId: string];

export function isListNamespaceForbiddenArgs(args: unknown[]): args is ListNamespaceForbiddenArgs {
  return args.length === 1 && typeof args[0] === "string";
}

/**
 * Sent by a cluster frame as it goes away, so its entry in the frame registry does not linger and
 * broadcasts are not aimed at a frame that no longer exists.
 */
export const clusterUnsetFrameIdChannel = "cluster:unset-frame-id";
