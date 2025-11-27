import "./release-details.scss";

import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { ReleaseDetailsDrawer } from "./release-details-drawer";
import targetHelmReleaseInjectable from "./target-helm-release.injectable";

import type { IComputedValue } from "mobx";

import type { TargetHelmRelease } from "./target-helm-release.injectable";

interface Dependencies {
  targetRelease: IComputedValue<TargetHelmRelease | undefined>;
}

const NonInjectedReleaseDetails = observer(({ targetRelease }: Dependencies) => {
  const release = targetRelease.get();

  return release ? <ReleaseDetailsDrawer targetRelease={release} /> : null;
});

export const ReleaseDetails = withInjectables<Dependencies>(NonInjectedReleaseDetails, {
  getProps: (di) => ({
    targetRelease: di.inject(targetHelmReleaseInjectable),
  }),
});
