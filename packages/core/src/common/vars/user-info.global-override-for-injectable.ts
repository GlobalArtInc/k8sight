import { getGlobalOverride } from "@kubesightapp/test-utils";
import userInfoInjectable from "./user-info.injectable";

export default getGlobalOverride(userInfoInjectable, () => ({
  gid: 1,
  homedir: "/some-home-dir",
  shell: "bash",
  uid: 2,
  username: "some-user-name",
}));
