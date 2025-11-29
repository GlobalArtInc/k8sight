import { getApplicationBuilder } from "../../renderer/components/test-utils/get-application-builder";
import { K8sightMainExtension } from "../k8sight-main-extension";

describe("k8sight extension", () => {
  let ext: K8sightMainExtension;

  beforeEach(async () => {
    const builder = getApplicationBuilder();

    /**
     * This is required because it sets up `AppPaths` which are required by K8sightMainExtension.
     *
     * That type isn't used internally so it needs to use "legacy global DI" to get its dependencies.
     */
    await builder.render();

    ext = new K8sightMainExtension({
      manifest: {
        name: "foo-bar",
        version: "0.1.1",
        engines: { k8sight: "^0.1.0" },
      },
      id: "/this/is/fake/package.json",
      absolutePath: "/absolute/fake/",
      manifestPath: "/this/is/fake/package.json",
      isBundled: false,
      isEnabled: true,
      isCompatible: true,
    });
  });

  describe("name", () => {
    it("returns name", () => {
      expect(ext.name).toBe("foo-bar");
    });
  });
});
