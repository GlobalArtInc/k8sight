import "./welcome.scss";

import { Icon } from "@kubesightapp/icon";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { forumsUrl } from "../../../common/vars";
import productNameInjectable from "../../../common/vars/product-name.injectable";
import newVersionNotificationInjectable from "./new-version-notification.injectable";
import welcomeMenuItemsInjectable from "./welcome-menu-items/welcome-menu-items.injectable";

import type { IComputedValue } from "mobx";

import type { WelcomeMenuRegistration } from "./welcome-menu-items/welcome-menu-registration";

export const defaultWidth = 420;

interface Dependencies {
  welcomeMenuItems: IComputedValue<WelcomeMenuRegistration[]>;
  productName: string;
  newVersionNotification: () => Promise<void> | void;
}

const NonInjectedWelcome = observer(({ welcomeMenuItems, productName, newVersionNotification }: Dependencies) => {
  useEffect(() => {
    newVersionNotification();
  }, []);

  return (
    <div className="flex justify-center Welcome align-center" data-testid="welcome-page">
      <div className="welcome-container" data-testid="welcome-banner-container">
        <div className="welcome-header">
          <div className="logo-wrapper">
            <Icon svg="logo-k8sight" className="logo" welcomeLogo={true} data-testid="no-welcome-banners-icon" />
          </div>
          <h1 className="welcome-title">
            <span className="welcome-greeting">Welcome to</span>
            <span className="product-name">{productName}</span>
          </h1>
        </div>

        <div className="welcome-content" data-testid="welcome-text-container">
          <p className="welcome-description">
            To get you started we have auto-detected your clusters in your kubeconfig file and added them to the
            catalog, your centralized view for managing all your cloud-native resources.
          </p>

          <div className="welcome-actions" data-testid="welcome-menu-container">
            {welcomeMenuItems.get().map((item, index) => (
              <div
                key={index}
                className="welcome-menu-item"
                onClick={() => item.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    item.click();
                  }
                }}
              >
                <div className="menu-item-icon">
                  <Icon material={item.icon} />
                </div>
                <span className="menu-item-title">{typeof item.title === "string" ? item.title : item.title()}</span>
                <div className="menu-item-arrow">
                  <Icon material="navigate_next" />
                </div>
              </div>
            ))}
          </div>

          <div className="welcome-footer">
            <p className="footer-text">
              {"Have questions or feedback? Join us on our "}
              <a href={forumsUrl} target="_blank" rel="noreferrer" className="footer-link">
                GitHub repository
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const Welcome = withInjectables<Dependencies>(NonInjectedWelcome, {
  getProps: (di) => ({
    welcomeMenuItems: di.inject(welcomeMenuItemsInjectable),
    productName: di.inject(productNameInjectable),
    newVersionNotification: di.inject(newVersionNotificationInjectable),
  }),
});
