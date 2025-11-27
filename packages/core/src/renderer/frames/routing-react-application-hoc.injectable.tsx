import { reactApplicationHigherOrderComponentInjectionToken } from "@kubesightapp/react-application";
import { historyInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import { Router } from "react-router";

const routingReactApplicationHocInjectable = getInjectable({
  id: "routing-react-application-hoc",

  instantiate: (di) => {
    const history = di.inject(historyInjectionToken);

    return ({ children }) => <Router history={history}>{children}</Router>;
  },

  injectionToken: reactApplicationHigherOrderComponentInjectionToken,
});

export default routingReactApplicationHocInjectable;
