import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { pipeline } from "@ogre-tools/fp";
import { getInjectable } from "@ogre-tools/injectable";
import { map } from "lodash/fp";
import { extensionRegistratorInjectionToken } from "../../../extensions/extension-loader/extension-registrator-injection-token";

import type { ExtensionRegistrator } from "../../../extensions/extension-loader/extension-registrator-injection-token";
import type { K8sightRendererExtension } from "../../../extensions/k8sight-renderer-extension";

const clusterFrameComponentRegistratorInjectable = getInjectable({
  id: "cluster-frame-component-registrator",

  instantiate: (): ExtensionRegistrator => {
    return (ext) => {
      const extension = ext as K8sightRendererExtension;

      return pipeline(
        extension.clusterFrameComponents,

        map((clusterFrameComponentRegistration) => {
          const id = `${extension.sanitizedExtensionId}-${clusterFrameComponentRegistration.id}`;

          return getInjectable({
            id,
            injectionToken: clusterFrameChildComponentInjectionToken,
            instantiate: () => ({
              id,
              shouldRender: clusterFrameComponentRegistration.shouldRender,
              Component: clusterFrameComponentRegistration.Component,
            }),
          });
        }),
      );
    };
  },
  injectionToken: extensionRegistratorInjectionToken,
});

export default clusterFrameComponentRegistratorInjectable;
