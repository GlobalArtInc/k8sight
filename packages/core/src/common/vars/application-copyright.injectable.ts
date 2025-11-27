import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const applicationCopyrightInjectable = getInjectable({
  id: "application-copyright",
  instantiate: (di) => di.inject(applicationInformationToken).copyright,
});

export default applicationCopyrightInjectable;
