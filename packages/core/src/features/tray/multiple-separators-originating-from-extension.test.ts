import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getApplicationBuilder } from "../../renderer/components/test-utils/get-application-builder";

import type { ApplicationBuilder } from "../../renderer/components/test-utils/get-application-builder";

describe("multiple separators originating from extension", () => {
  let builder: ApplicationBuilder;

  beforeEach(async () => {
    builder = getApplicationBuilder();

    builder.beforeApplicationStart(({ mainDi }) => {
      mainDi.unoverride(getRandomIdInjectionToken);
      mainDi.permitSideEffects(getRandomIdInjectionToken);
    });

    await builder.render();
  });

  it("given extension with multiple separators, when extension is enabled, does not throw", () => {
    const someExtension = {
      id: "some-extension-id",
      name: "some-extension",

      mainOptions: {
        trayMenus: [{ type: "separator" as const }, { type: "separator" as const }],
      },
    };

    expect(() => {
      builder.extensions.enable(someExtension);
    }).not.toThrow();
  });
});
