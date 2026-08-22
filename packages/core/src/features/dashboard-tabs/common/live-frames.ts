/**
 * How many cluster frames stay alive at once, unless the user has said otherwise.
 *
 * Each frame is a full renderer -- React, Monaco, the cluster's own watches -- so keeping one per
 * open tab does not scale to a strip of a dozen. Tabs beyond this budget are evicted least
 * recently used first; they stay in the strip and rebuild, on their saved page, when reopened.
 */
export const defaultMaxLiveFrames = 6;

/** Below one there would be no frame left to show the active tab in. */
export const minLiveFrames = 1;

/**
 * Coerces a budget that came from persisted preferences, where it may be anything at all.
 */
export const clampLiveFrames = (count: number) =>
  Number.isFinite(count) ? Math.max(minLiveFrames, Math.floor(count)) : defaultMaxLiveFrames;
