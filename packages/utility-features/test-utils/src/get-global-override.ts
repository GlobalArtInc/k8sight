import type { Injectable, InjectionToken, Instantiate } from "@ogre-tools/injectable";

export type GlobalOverride<
  InjectionInstance extends InjectionTokenInstance,
  InjectionTokenInstance,
  InstantiationParam,
> = ReturnType<typeof getGlobalOverride<InjectionInstance, InjectionTokenInstance, InstantiationParam>>;

export function getGlobalOverride<
  InjectionInstance extends InjectionTokenInstance,
  InjectionTokenInstance,
  InstantiationParam,
>(
  injectable:
    | InjectionToken<InjectionInstance, InstantiationParam>
    | Injectable<InjectionInstance, InjectionTokenInstance, InstantiationParam>,
  overridingInstantiate: Instantiate<InjectionInstance, InstantiationParam>,
) {
  return {
    injectable,
    overridingInstantiate,
  };
}
