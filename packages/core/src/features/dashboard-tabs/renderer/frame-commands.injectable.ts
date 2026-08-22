import { getInjectable } from "@ogre-tools/injectable";

import type { FrameState } from "./frame-states.injectable";
import type { RootToFrameMessage } from "../common/frame-bridge";

export interface FrameCommand {
  readonly message: RootToFrameMessage;
  /** Whether the frame has done what was asked, judged from what it reports back. */
  readonly isSatisfied: (state: FrameState) => boolean;
}

export interface FrameCommands {
  /** Queues an instruction for a frame, to be delivered once it reports for the first time. */
  request: (viewId: string, command: FrameCommand) => void;
  /**
   * @returns the message to post now, if the frame has not yet done what was asked.
   */
  reconcile: (viewId: string, state: FrameState) => RootToFrameMessage | undefined;
  forget: (viewId: string) => void;
}

/**
 * A frame cannot be steered the moment it is created: it boots on its own start page, and its
 * message listener is not up until its app has loaded. So instructions are held until the frame
 * reports in, then re-sent while it has not complied.
 *
 * Attempts are capped -- a route may redirect elsewhere, or a page may be gone -- because without
 * a cap the frame and the root would push each other back and forth forever.
 */
const maxAttempts = 2;

const frameCommandsInjectable = getInjectable({
  id: "frame-commands",

  instantiate: (): FrameCommands => {
    const pending = new Map<string, { command: FrameCommand; attempts: number }>();

    return {
      request: (viewId, command) => {
        pending.set(viewId, { command, attempts: 0 });
      },

      forget: (viewId) => {
        pending.delete(viewId);
      },

      reconcile: (viewId, state) => {
        const entry = pending.get(viewId);

        if (!entry) {
          return undefined;
        }

        if (entry.command.isSatisfied(state) || entry.attempts >= maxAttempts) {
          pending.delete(viewId);

          return undefined;
        }

        entry.attempts += 1;

        return entry.command.message;
      },
    };
  },
});

export default frameCommandsInjectable;
