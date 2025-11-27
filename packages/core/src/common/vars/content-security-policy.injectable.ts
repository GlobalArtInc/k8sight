import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const contentSecurityPolicyInjectable = getInjectable({
  id: "content-security-policy",
  instantiate: (di) => di.inject(applicationInformationToken).contentSecurityPolicy,
});

export default contentSecurityPolicyInjectable;
