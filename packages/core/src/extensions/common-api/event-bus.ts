import { asLegacyGlobalForExtensionApi } from "@kubesightapp/legacy-global-di";
import appEventBusInjectable from "../../common/app-event-bus/app-event-bus.injectable";

import type { EventEmitter, EventEmitterCallback, EventEmitterOptions } from "@kubesightapp/event-emitter";

import type { AppEvent } from "../../common/app-event-bus/event-bus";

export type { AppEvent, EventEmitter, EventEmitterCallback, EventEmitterOptions };

export const appEventBus = asLegacyGlobalForExtensionApi(appEventBusInjectable);
