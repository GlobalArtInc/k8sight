import { Icon } from "@kubesightapp/icon";
import { deploymentApiInjectable } from "@kubesightapp/kube-api-specifics";
import { showCheckedErrorNotificationInjectable } from "@kubesightapp/notifications";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import createWorkloadLogsTabInjectable from "../dock/logs/create-workload-logs-tab.injectable";
import openConfirmDialogInjectable from "../confirm-dialog/open.injectable";
import hideDetailsInjectable from "../kube-detail-params/hide-details.injectable";
import { MenuItem } from "../menu";
import openDeploymentScaleDialogInjectable from "./scale/open.injectable";

import type { DeploymentApi } from "@kubesightapp/kube-api";
import type { Deployment } from "@kubesightapp/kube-object";
import type { ShowCheckedErrorNotification } from "@kubesightapp/notifications";

import type { OpenConfirmDialog } from "../confirm-dialog/open.injectable";
import type { HideDetails } from "../kube-detail-params/hide-details.injectable";
import type { KubeObjectMenuProps } from "../kube-object-menu";
import type { OpenDeploymentScaleDialog } from "./scale/open.injectable";

export interface DeploymentMenuProps extends KubeObjectMenuProps<Deployment> {}

interface Dependencies {
  openDeploymentScaleDialog: OpenDeploymentScaleDialog;
  deploymentApi: DeploymentApi;
  openConfirmDialog: OpenConfirmDialog;
  showCheckedErrorNotification: ShowCheckedErrorNotification;
  createWorkloadLogsTab: ReturnType<typeof createWorkloadLogsTabInjectable.instantiate>;
  hideDetails: HideDetails;
}

const NonInjectedDeploymentMenu = ({
  deploymentApi,
  object,
  openDeploymentScaleDialog,
  toolbar,
  openConfirmDialog,
  showCheckedErrorNotification,
  createWorkloadLogsTab,
  hideDetails,
}: Dependencies & DeploymentMenuProps) => (
  <>
    <MenuItem onClick={() => openDeploymentScaleDialog(object)}>
      <Icon material="open_with" tooltip="Scale" interactive={toolbar} />
      <span className="title">Scale</span>
    </MenuItem>
    <MenuItem
      onClick={() =>
        openConfirmDialog({
          ok: async () => {
            try {
              await deploymentApi.restart({
                namespace: object.getNs(),
                name: object.getName(),
              });
            } catch (err) {
              showCheckedErrorNotification(err, "Unknown error occurred while restarting deployment");
            }
          },
          labelOk: "Restart",
          message: (
            <p>
              {"Are you sure you want to restart deployment "}
              <b>{object.getName()}</b>?
            </p>
          ),
        })
      }
    >
      <Icon material="autorenew" tooltip="Restart" interactive={toolbar} />
      <span className="title">Restart</span>
    </MenuItem>
    <MenuItem
      onClick={() => {
        createWorkloadLogsTab({ workload: object });
        hideDetails();
      }}
    >
      <Icon material="subject" tooltip="View Logs" interactive={toolbar} />
      <span className="title">View Logs</span>
    </MenuItem>
  </>
);

export const DeploymentMenu = withInjectables<Dependencies, DeploymentMenuProps>(NonInjectedDeploymentMenu, {
  getProps: (di, props) => ({
    ...props,
    deploymentApi: di.inject(deploymentApiInjectable),
    openDeploymentScaleDialog: di.inject(openDeploymentScaleDialogInjectable),
    openConfirmDialog: di.inject(openConfirmDialogInjectable),
    showCheckedErrorNotification: di.inject(showCheckedErrorNotificationInjectable),
    createWorkloadLogsTab: di.inject(createWorkloadLogsTabInjectable),
    hideDetails: di.inject(hideDetailsInjectable),
  }),
});
