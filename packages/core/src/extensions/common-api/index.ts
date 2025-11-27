import { asLegacyGlobalForExtensionApi } from "@kubesightapp/legacy-global-di";
import { loggerInjectionToken } from "@kubesightapp/logger";

// APIs
export { App } from "./app";
export * as Catalog from "./catalog";
export * as EventBus from "./event-bus";
export * as Proxy from "./proxy";
export * as Store from "./stores";
export * as Types from "./types";
export { Util } from "./utils";

export type { InstalledExtension, LensExtensionManifest } from "@kubesightapp/legacy-extensions";
export type { Logger } from "@kubesightapp/logger";

export type { PackageJson } from "type-fest";

export type { LensExtension } from "../lens-extension";

export const logger = asLegacyGlobalForExtensionApi(loggerInjectionToken);
