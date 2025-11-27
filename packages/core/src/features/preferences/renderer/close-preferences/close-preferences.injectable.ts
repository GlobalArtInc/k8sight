import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import navigateToFrontPageInjectable from "../../../../common/front-end-routing/navigate-to-front-page.injectable";

const closePreferencesInjectable = getInjectable({
  id: "close-preferences",

  instantiate: (di) => {
    const observableHistory = di.inject(observableHistoryInjectionToken);
    const navigateToFrontPage = di.inject(navigateToFrontPageInjectable);

    return () => {
      if (observableHistory.length <= 1) {
        navigateToFrontPage();
      } else {
        observableHistory.goBack();
      }
    };
  },
});

export default closePreferencesInjectable;
