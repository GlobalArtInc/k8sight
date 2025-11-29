import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { SubTitle } from "../../../../../../../renderer/components/layout/sub-title";
import { Select } from "../../../../../../../renderer/components/select";
import { defaultPackageMirror, packageMirrors } from "../../../../../../user-preferences/common/preferences-helpers";
import userPreferencesStateInjectable from "../../../../../../user-preferences/common/state.injectable";

import type { UserPreferencesState } from "../../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
}

const downloadMirrorOptions = Array.from(packageMirrors, ([name, mirror]) => ({
  value: name,
  label: mirror.label,

  // TODO: Side-effect
  isDisabled: !mirror.platforms.has(process.platform),
}));

const NonInjectedKubectlDownloadMirror = observer(({ state }: Dependencies) => (
  <section>
    <SubTitle title="Download mirror" />
    <Select
      id="download-mirror-input"
      placeholder="Download mirror for kubectl"
      options={downloadMirrorOptions}
      value={state.downloadMirror}
      onChange={(option) => (state.downloadMirror = option?.value ?? defaultPackageMirror)}
      isDisabled={!state.downloadKubectlBinaries}
      themeName="k8sight"
    />
  </section>
));

export const KubectlDownloadMirror = withInjectables<Dependencies>(NonInjectedKubectlDownloadMirror, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
