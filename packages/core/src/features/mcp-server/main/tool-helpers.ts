import { z } from "zod";

export const asText = (value: unknown) => ({
  content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});

/**
 * Told to the assistant rather than thrown, so it reports back that the user said no instead of
 * treating it as a fault worth retrying.
 */
export const asDeclined = (what: string) => ({
  isError: true,
  content: [
    {
      type: "text" as const,
      text: `The user declined this in k8sight, so ${what} was left untouched. Do not retry without being asked to.`,
    },
  ],
});

export const clusterIdSchema = z.string().describe("Cluster id, as returned by list_clusters");
