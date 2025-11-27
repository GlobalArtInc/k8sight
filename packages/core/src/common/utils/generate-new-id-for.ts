import { createHash } from "crypto";

export function generateNewIdFor(cluster: { kubeConfigPath: string; contextName: string }): string {
  return createHash("md5").update(`${cluster.kubeConfigPath}:${cluster.contextName}`).digest("hex");
}
