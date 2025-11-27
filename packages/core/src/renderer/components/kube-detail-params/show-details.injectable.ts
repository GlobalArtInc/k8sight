import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import getDetailsUrlInjectable from "./get-details-url.injectable";

/**
 * @param selfLink The Kube selflink to show details for
 * @param resetSelected If true then will reset the selected kube object (which object is highlighted generally)
 * @default resetSelected true
 */
export type ShowDetails = (selfLink: string | undefined, resetSelected?: boolean) => void;

const showDetailsInjectable = getInjectable({
  id: "show-details",
  instantiate: (di): ShowDetails => {
    const observableHistory = di.inject(observableHistoryInjectionToken);
    const getDetailsUrl = di.inject(getDetailsUrlInjectable);

    return (selfLink = "", resetSelected = true) => {
      observableHistory.merge({
        search: getDetailsUrl(selfLink, resetSelected),
      });
    };
  },
});

export default showDetailsInjectable;
