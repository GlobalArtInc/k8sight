export interface ContainerPort {
  containerPort: number;
  hostIP?: string;
  hostPort?: number;
  name?: string;
  protocol?: "UDP" | "TCP" | "SCTP";
}
