import { getInjectable } from "@ogre-tools/injectable";
import { ShellRequestAuthenticator } from "./shell-request-authenticator";

const shellRequestAuthenticatorInjectable = getInjectable({
  id: "shell-request-authenticator",

  instantiate: () => {
    const authenticator = new ShellRequestAuthenticator();

    authenticator.init();

    return authenticator;
  },
});

export default shellRequestAuthenticatorInjectable;
