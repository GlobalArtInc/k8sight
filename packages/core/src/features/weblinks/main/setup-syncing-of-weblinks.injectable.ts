import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { iter } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import catalogEntityRegistryInjectable from "../../../main/catalog/entity-registry.injectable";
import weblinkVerificationStartableStoppableInjectable from "./weblink-verification.injectable";
import weblinkVerificationsInjectable from "./weblink-verifications.injectable";

const setupSyncingOfWeblinksInjectable = getInjectable({
  id: "setup-syncing-of-weblinks",

  instantiate: (di) => ({
    run: () => {
      const weblinkVerificationStartableStoppable = di.inject(weblinkVerificationStartableStoppableInjectable);
      const catalogEntityRegistry = di.inject(catalogEntityRegistryInjectable);
      const weblinkVerifications = di.inject(weblinkVerificationsInjectable);

      weblinkVerificationStartableStoppable.start();
      catalogEntityRegistry.addComputedSource(
        "weblinks",
        computed(() =>
          iter
            .chain(weblinkVerifications.values())
            .map(([weblink]) => weblink)
            .toArray(),
        ),
      );
    },
  }),

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default setupSyncingOfWeblinksInjectable;
