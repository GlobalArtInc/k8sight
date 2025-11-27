import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const applicationDescriptionInjectable = getInjectable({
  id: "application-description",
  instantiate: (di) => di.inject(applicationInformationToken).description,
});

export default applicationDescriptionInjectable;
