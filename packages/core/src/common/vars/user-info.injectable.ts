import { getInjectable } from "@ogre-tools/injectable";
import { userInfo } from "os";

const userInfoInjectable = getInjectable({
  id: "user-info",
  instantiate: () => userInfo(),
  causesSideEffects: true,
});

export default userInfoInjectable;
