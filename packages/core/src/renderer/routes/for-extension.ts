import { getSanitizedPath } from "../../extensions/k8sight-extension";

import type { K8sightRendererExtension } from "../../extensions/k8sight-renderer-extension";

export function getExtensionRoutePath(extension: K8sightRendererExtension, pageId: string | undefined) {
  const routeId = getExtensionRouteId(extension.sanitizedExtensionId, pageId);

  return getSanitizedPath("/extension", routeId);
}

export function getExtensionRouteId(extensionId: string, registrationId: string | undefined) {
  return registrationId ? `${extensionId}/${registrationId}` : extensionId;
}
