import type http from "http";
import type net from "net";

import type { SetRequired } from "type-fest";

import type { Cluster } from "../../../common/cluster/cluster";

export interface ProxyApiRequestArgs {
  req: SetRequired<http.IncomingMessage, "url" | "method">;
  socket: net.Socket;
  head: Buffer;
  cluster: Cluster;
}
