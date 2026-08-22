import type { KubeObject } from "@kubesightapp/kube-object";

export type FluxState = "ready" | "failing" | "reconciling" | "suspended";

interface FluxCondition {
  type?: string;
  status?: string;
  reason?: string;
  message?: string;
}

const conditionsOf = (resource: KubeObject): FluxCondition[] =>
  (resource.status as { conditions?: FluxCondition[] } | undefined)?.conditions ?? [];

export const readyConditionOf = (resource: KubeObject) =>
  conditionsOf(resource).find((condition) => condition.type === "Ready");

export const isSuspended = (resource: KubeObject) =>
  (resource.spec as { suspend?: boolean } | undefined)?.suspend === true;

/**
 * Reduces a Flux resource to the state its dashboard tile counts it under.
 *
 * Suspended wins over everything: a suspended resource keeps whatever Ready condition it had when
 * it was paused, so reading that condition would report it as healthy or broken long after Flux
 * stopped acting on it.
 */
export const fluxStateOf = (resource: KubeObject): FluxState => {
  if (isSuspended(resource)) {
    return "suspended";
  }

  const ready = readyConditionOf(resource);

  if (ready?.status === "True") {
    return "ready";
  }

  // Flux reports an in-flight reconciliation as Ready=Unknown, and only a settled failure as False.
  return ready?.status === "False" ? "failing" : "reconciling";
};

export const messageOf = (resource: KubeObject) => readyConditionOf(resource)?.message ?? "";
