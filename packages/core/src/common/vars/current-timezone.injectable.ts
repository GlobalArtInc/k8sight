import { getInjectable } from "@ogre-tools/injectable";
import moment from "moment-timezone";

const currentTimezoneInjectable = getInjectable({
  id: "current-timezone",
  instantiate: () => moment.tz.guess(true),
  causesSideEffects: true,
});

export default currentTimezoneInjectable;
