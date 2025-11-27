/**
 * An action based on opening a socket
 */
export interface TcpSocketAction {
  /**
   * Host name to connect to, defaults to the pod IP.
   */
  host?: string;

  /**
   * Port to connect to
   */
  port: number | string;
}
