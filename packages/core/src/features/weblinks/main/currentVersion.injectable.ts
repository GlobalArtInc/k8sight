import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";
import { docsUrl, forumsUrl } from "../../../common/vars";
import { weblinkStoreMigrationInjectionToken } from "../../../features/weblinks/common/migration-token";
import { k8sightDocumentationWeblinkId, k8sightForumsWeblinkId } from "../../../features/weblinks/main/links";

import type { WeblinkData } from "../common/storage.injectable";

const currentVersionWeblinkStoreMigrationInjectable = getInjectable({
  id: "current-version-weblink-store-migration",
  instantiate: (di) => {
    const { version } = di.inject(applicationInformationToken);

    return {
      version, // Run always after upgrade
      run(store) {
        const weblinksRaw = store.get("weblinks");
        const weblinks = (Array.isArray(weblinksRaw) ? weblinksRaw : []) as WeblinkData[];
        const forumsWeblink = weblinks.find((weblink) => weblink.id === k8sightForumsWeblinkId);

        if (forumsWeblink) {
          forumsWeblink.url = forumsUrl;
        }

        const docsWeblink = weblinks.find((weblink) => weblink.id === k8sightDocumentationWeblinkId);

        if (docsWeblink) {
          docsWeblink.url = docsUrl;
        }

        const removedSlackLink = weblinks.filter((weblink) => weblink.id !== "k8sight-slack-link");

        store.set("weblinks", removedSlackLink);
      },
    };
  },
  injectionToken: weblinkStoreMigrationInjectionToken,
});

export default currentVersionWeblinkStoreMigrationInjectable;
