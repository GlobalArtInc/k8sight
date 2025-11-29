import { K8sightMainExtension } from "../../../extensions/k8sight-main-extension";
import { K8sightRendererExtension } from "../../../extensions/k8sight-renderer-extension";

export class TestExtensionMain extends K8sightMainExtension {}
export class TestExtensionRenderer extends K8sightRendererExtension {}

export interface FakeExtensionOptions {
  id: string;
  name: string;
  rendererOptions?: Partial<K8sightRendererExtension>;
  mainOptions?: Partial<K8sightMainExtension>;
}

export const getExtensionFakeForMain = ({ id, name, mainOptions = {} }: FakeExtensionOptions) =>
  Object.assign(
    new TestExtensionMain({
      id,
      absolutePath: "irrelevant",
      isBundled: false,
      isCompatible: false,
      isEnabled: false,
      manifest: {
        name,
        version: "1.0.0",
        engines: {
          k8sight: "^0.1.0",
        },
      },
      manifestPath: "irrelevant",
    }),
    mainOptions,
  );

export const getExtensionFakeForRenderer = ({ id, name, rendererOptions = {} }: FakeExtensionOptions) =>
  Object.assign(
    new TestExtensionRenderer({
      id,
      absolutePath: "irrelevant",
      isBundled: false,
      isCompatible: false,
      isEnabled: false,
      manifest: {
        name,
        version: "1.0.0",
        engines: {
          k8sight: "^0.1.0",
        },
      },
      manifestPath: "irrelevant",
    }),
    rendererOptions,
  );
