import type { ExecAction } from "./exec-action";
import type { HttpGetAction } from "./http-get-action";
import type { TcpSocketAction } from "./tcp-socket-action";

/**
 * Handler defines a specific action that should be taken.
 */
export interface Handler {
  exec?: ExecAction;
  httpGet?: HttpGetAction;
  tcpSocket?: TcpSocketAction;
}
