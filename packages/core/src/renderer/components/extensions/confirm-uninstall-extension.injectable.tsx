import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import { extensionDisplayName } from "../../../extensions/k8sight-extension";
import confirmInjectable from "../confirm-dialog/confirm.injectable";
import uninstallExtensionInjectable from "./uninstall-extension.injectable";

import type { InstalledExtension, K8sightExtensionId } from "@kubesightapp/legacy-extensions";

import type { Confirm } from "../confirm-dialog/confirm.injectable";

interface Dependencies {
  uninstallExtension: (id: K8sightExtensionId) => Promise<boolean>;
  confirm: Confirm;
}

export type ConfirmUninstallExtension = (ext: InstalledExtension) => Promise<void>;

const confirmUninstallExtension =
  ({ uninstallExtension, confirm }: Dependencies): ConfirmUninstallExtension =>
  async (extension) => {
    const displayName = extensionDisplayName(extension.manifest.name, extension.manifest.version);
    const confirmed = await confirm({
      message: (
        <p>
          {"Are you sure you want to uninstall extension "}
          <b>{displayName}</b>?
        </p>
      ),
      labelOk: "Yes",
      labelCancel: "No",
    });

    if (confirmed) {
      await uninstallExtension(extension.id);
    }
  };

const confirmUninstallExtensionInjectable = getInjectable({
  id: "confirm-uninstall-extension",
  instantiate: (di) =>
    confirmUninstallExtension({
      uninstallExtension: di.inject(uninstallExtensionInjectable),
      confirm: di.inject(confirmInjectable),
    }),
});

export default confirmUninstallExtensionInjectable;
