import { getSanitizedPath } from "../../extensions/lens-extension";

import type { LensRendererExtension } from "../../extensions/lens-renderer-extension";

export function getExtensionRoutePath(extension: LensRendererExtension, pageId: string | undefined) {
  const routeId = getExtensionRouteId(extension.sanitizedExtensionId, pageId);

  return getSanitizedPath("/extension", routeId);
}

export function getExtensionRouteId(extensionId: string, registrationId: string | undefined) {
  return registrationId ? `${extensionId}/${registrationId}` : extensionId;
}
