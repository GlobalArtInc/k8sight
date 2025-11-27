import type { CatalogEntity } from "../../../common/catalog";

export interface ShellEnvContext {
  catalogEntity: CatalogEntity;
}

export type ShellEnvModifier = (
  ctx: ShellEnvContext,
  env: Record<string, string | undefined>,
) => Record<string, string | undefined>;
