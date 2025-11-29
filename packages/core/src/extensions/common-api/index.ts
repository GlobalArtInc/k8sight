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

export type { InstalledExtension, K8sightExtensionManifest } from "@kubesightapp/legacy-extensions";
export type { Logger } from "@kubesightapp/logger";

export type { PackageJson } from "type-fest";

export type { K8sightExtension } from "../k8sight-extension";

export const logger = asLegacyGlobalForExtensionApi(loggerInjectionToken);
