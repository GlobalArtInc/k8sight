import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";
import pendingMcpPromptsInjectable from "./pending-prompts.injectable";

/**
 * Puts one yes/no question in front of the user and resolves with the answer.
 *
 * The caller only says how to raise it: it is handed the id the answer will come back under and is
 * expected to send whichever message the renderer knows how to render.
 */
export type AskUser = (raise: (id: string) => void) => Promise<boolean>;

/**
 * Long enough for the user to come back to the window, short enough that a forgotten dialog does not
 * hold an assistant's request -- or an MCP client's authorization redirect -- open forever.
 */
const answerTimeoutMs = 2 * 60 * 1000;

const askMcpUserInjectable = getInjectable({
  id: "ask-mcp-user",

  instantiate: (di): AskUser => {
    const getRandomId = di.inject(getRandomIdInjectionToken);
    const pending = di.inject(pendingMcpPromptsInjectable);

    const ask = (raise: (id: string) => void) =>
      new Promise<boolean>((resolve) => {
        const id = getRandomId();

        const settle = (approved: boolean) => {
          if (pending.delete(id)) {
            clearTimeout(timer);
            resolve(approved);
          }
        };

        /*
         * Denying is the safe answer, so anything that is not an explicit yes -- no window open, a
         * renderer that went away mid-dialog, a user who walked off -- ends up here.
         */
        const timer = setTimeout(() => settle(false), answerTimeoutMs);

        pending.set(id, settle);
        raise(id);
      });

    /*
     * Asked one at a time: the confirm dialog is a single slot, and batching several decisions
     * behind one glance is exactly what this is meant to prevent.
     */
    let queue: Promise<unknown> = Promise.resolve();

    return (raise) => {
      const answer = queue.then(() => ask(raise));

      queue = answer.catch(() => undefined);

      return answer;
    };
  },
});

export default askMcpUserInjectable;
