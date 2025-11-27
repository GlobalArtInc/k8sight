import { getInjectable } from "@ogre-tools/injectable";
import { powerMonitor } from "electron";

const powerMonitorInjectable = getInjectable({
  id: "power-monitor",
  instantiate: () => powerMonitor,
  causesSideEffects: true,
});

export default powerMonitorInjectable;
