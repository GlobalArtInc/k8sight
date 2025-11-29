import { getInjectionToken } from "@ogre-tools/injectable";

import type { LegacyK8sightExtension } from "@kubesightapp/legacy-extensions";

import type { Injectable } from "@ogre-tools/injectable";
import type { IComputedValue } from "mobx";

export type Injectables = Injectable<any, any, any>[];
export type Registration = Injectables | IComputedValue<Injectables>;
export type ExtensionRegistrator = (extension: LegacyK8sightExtension) => Registration;

export const extensionRegistratorInjectionToken = getInjectionToken<ExtensionRegistrator>({
  id: "extension-registrator-token",
});
