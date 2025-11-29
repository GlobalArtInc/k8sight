import { createHash } from "crypto";
import { broadcastMessage } from "../../common/ipc";
import { Singleton } from "../../common/utils/singleton";

import type { K8sightExtension } from "../k8sight-extension";

export const IpcPrefix = Symbol();

export abstract class IpcRegistrar extends Singleton {
  readonly [IpcPrefix]: string;

  constructor(protected readonly extension: K8sightExtension) {
    super();
    this[IpcPrefix] = createHash("sha256").update(extension.id).digest("hex");
  }

  /**
   *
   * @param channel The channel to broadcast to your whole extension, both `main` and `renderer`
   * @param args The arguments passed to all listeners
   */
  broadcast(channel: string, ...args: any[]): void {
    broadcastMessage(`extensions@${this[IpcPrefix]}:${channel}`, ...args);
  }
}
