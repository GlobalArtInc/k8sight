import { getInjectable } from "@ogre-tools/injectable";
import { afterRootFrameIsReadyInjectionToken } from "../../../main/start-main-application/runnable-tokens/phases";
import applicationUpdaterInjectable from "./updater.injectable";

/** Long enough that a machine left running for days still notices a release, short of nagging. */
const checkIntervalMs = 4 * 60 * 60 * 1000;

const startApplicationUpdateChecksInjectable = getInjectable({
  id: "start-application-update-checks",

  instantiate: (di) => {
    let started = false;

    return {
      run: () => {
        // The root frame reports itself ready again after every reload; the timer is wanted once.
        if (started) {
          return;
        }

        started = true;

        const updater = di.inject(applicationUpdaterInjectable);

        void updater.check();

        setInterval(() => void updater.check(), checkIntervalMs);
      },
    };
  },

  /*
   * Waiting for the root frame means the renderer's listener already exists, so the first result --
   * usually the only one a short session sees -- is not pushed into the void.
   */
  injectionToken: afterRootFrameIsReadyInjectionToken,
});

export default startApplicationUpdateChecksInjectable;
