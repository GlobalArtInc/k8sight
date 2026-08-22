import { Button } from "@kubesightapp/button";
import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { showInfoNotificationInjectable } from "@kubesightapp/notifications";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import productNameInjectable from "../../../common/vars/product-name.injectable";
import { downloadApplicationUpdateChannel, installApplicationUpdateChannel } from "../common/channels";
import { releasesPageUrl } from "../common/vars";

import type { Disposer } from "@kubesightapp/utilities";

import type { ApplicationUpdateState } from "../common/channels";

export type ShowApplicationUpdateNotification = (state: ApplicationUpdateState) => void;

/** Stable, so each new state replaces the previous card instead of stacking another one up. */
const notificationId = "application-update";

const showApplicationUpdateNotificationInjectable = getInjectable({
  id: "show-application-update-notification",

  instantiate: (di): ShowApplicationUpdateNotification => {
    const productName = di.inject(productNameInjectable);
    const showInfoNotification = di.inject(showInfoNotificationInjectable);
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    let dismiss: Disposer | undefined;

    const releasePageLink = (
      <a href={releasesPageUrl} target="_blank" rel="noreferrer" className="NotificationLink">
        release page
      </a>
    );

    const contentFor = ({ phase, version, downloadedPercent, canInstall }: ApplicationUpdateState) => {
      const name = version ? `${productName} v${version}` : productName;

      switch (phase) {
        case "available":
          /*
           * A build that cannot install its own replacement is never offered a button that would
           * dead-end; it gets the page it can download from by hand.
           */
          return canInstall ? (
            <div className="flex column gaps">
              <div>{name} is available.</div>
              <div>
                <Button
                  primary
                  label="Download"
                  onClick={() => void requestFromChannel(downloadApplicationUpdateChannel)}
                />
              </div>
            </div>
          ) : (
            <div className="flex column gaps">
              <div>
                {name} is available on the {releasePageLink}.
              </div>
            </div>
          );

        case "downloading":
          return (
            <div className="flex column gaps">
              <div>
                Downloading {name}… {downloadedPercent ?? 0}%
              </div>
            </div>
          );

        case "downloaded":
          return (
            <div className="flex column gaps">
              <div>{name} has been downloaded and will be installed the next time you quit.</div>
              <div>
                <Button
                  primary
                  label="Restart to update"
                  onClick={() => void requestFromChannel(installApplicationUpdateChannel)}
                />
              </div>
            </div>
          );

        case "failed":
          return (
            <div className="flex column gaps">
              <div>
                {name} could not be downloaded. You can get it from the {releasePageLink}.
              </div>
            </div>
          );

        // Nothing to say while idle or mid-check.
        default:
          return undefined;
      }
    };

    return (state) => {
      const content = contentFor(state);

      dismiss?.();
      dismiss = undefined;

      if (!content) {
        return;
      }

      // No timeout: this is the only place the actions live, and it still has its own close button.
      dismiss = showInfoNotification(content, { id: notificationId, timeout: 0 });
    };
  },
});

export default showApplicationUpdateNotificationInjectable;
