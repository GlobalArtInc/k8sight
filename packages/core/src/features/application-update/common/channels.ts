import { getMessageChannel, getRequestChannel } from "@kubesightapp/messaging";

/**
 * Where the one update main knows about has got to.
 *
 * `failed` is deliberately reserved for work the user asked for: a check that cannot reach GitHub
 * -- an offline laptop, a blocked proxy -- drops back to `idle` and is only logged, because an
 * error toast on every launch would be noise nobody can act on.
 */
export type ApplicationUpdatePhase = "idle" | "checking" | "available" | "downloading" | "downloaded" | "failed";

export interface ApplicationUpdateState {
  phase: ApplicationUpdatePhase;

  /** The version being offered, downloaded or waiting to be installed. */
  version?: string;

  /** Whole percent, present while downloading. */
  downloadedPercent?: number;

  /**
   * Whether this build is able to replace itself. False means the renderer must never offer
   * "Download" or "Restart to update" -- the release page is the only honest action left.
   */
  canInstall: boolean;
}

/*
 * Main cannot request anything from a renderer, so everything the user can set in motion travels as
 * a request to main, and main answers by pushing a new state to every frame.
 *
 * The state rides along on the message rather than being fetched back: it is small, it is already
 * whole, and download progress would otherwise cost a round trip per percent.
 */
export const applicationUpdateStateChangedChannel = getMessageChannel<ApplicationUpdateState>(
  "application-update-state-changed",
);

/** For a frame that starts, or opens the Welcome page, after the last state was pushed. */
export const applicationUpdateStateChannel = getRequestChannel<void, ApplicationUpdateState>(
  "application-update-state",
);

export const checkForApplicationUpdateChannel = getRequestChannel<void, void>("check-for-application-update");

export const downloadApplicationUpdateChannel = getRequestChannel<void, void>("download-application-update");

export const installApplicationUpdateChannel = getRequestChannel<void, void>("install-application-update");
