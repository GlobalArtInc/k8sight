import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { Input, InputValidators } from "../../../../../../renderer/components/input";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { clampLiveFrames, minLiveFrames } from "../../../../../dashboard-tabs/common/live-frames";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";

import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
}

const NonInjectedLiveFrames = observer(({ state }: Dependencies) => (
  <section className="small">
    <SubTitle title="Live cluster tabs" />
    <Input
      theme="round-black"
      type="number"
      min={minLiveFrames}
      validators={InputValidators.isNumber}
      value={state.maxLiveClusterFrames.toString()}
      onChange={(value) => (state.maxLiveClusterFrames = clampLiveFrames(Number(value)))}
    />
    <small className="hint">
      How many dashboard tabs keep a running cluster view in memory. Each one is a full renderer with its own watches,
      so a lower number saves memory; tabs past the limit stay in the strip and reload, on the page they were showing,
      when you come back to them.
    </small>
  </section>
));

export const LiveFrames = withInjectables<Dependencies>(NonInjectedLiveFrames, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
