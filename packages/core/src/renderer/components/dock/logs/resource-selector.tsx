import "./resource-selector.scss";

import { observer } from "mobx-react";
import React from "react";
import { Badge } from "../../badge";
import { Select } from "../../select";

import type { Container, Pod } from "@kubesightapp/kube-object";

import type { SingleValue } from "react-select";

import type { SelectOption } from "../../select";
import type { LogTabViewModel } from "./logs-view-model";

export interface LogResourceSelectorProps {
  model: LogTabViewModel;
}

export const LogResourceSelector = observer(({ model }: LogResourceSelectorProps) => {
  const tabData = model.logTabData.get();

  if (!tabData) {
    return null;
  }

  const { selectedContainer, owner, selectedPodId } = tabData;
  const pods = model.pods.get();
  const pod = model.pod.get();
  const isAllPodsMode = selectedPodId === "all-pods";

  if (pods.length === 0) {
    return null;
  }

  const allPodsOption = {
    value: "all-pods" as const,
    label: "All Pods",
  };

  const podOptions = [
    allPodsOption,
    ...pods.map((pod) => ({
      value: pod,
      label: pod.getName(),
    })),
  ];

  const currentPod = isAllPodsMode ? pods[0] : pod;

  if (!currentPod) {
    return null;
  }

  const allContainers = currentPod.getAllContainers();
  const container = allContainers.find((container) => container.name === selectedContainer) ?? null;
  const onContainerChange = (option: SingleValue<SelectOption<Container>>) => {
    if (!option) {
      return;
    }

    model.updateLogTabData({
      selectedContainer: option.value.name,
    });
    model.reloadLogs();
  };

  const onPodChange = (option: SingleValue<SelectOption<Pod | "all-pods">>) => {
    if (!option) {
      return;
    }

    if (option.value === "all-pods") {
      const firstPod = pods[0];
      if (!firstPod) {
        return;
      }

      model.updateLogTabData({
        selectedPodId: "all-pods",
        selectedContainer: firstPod.getAllContainers()[0]?.name ?? selectedContainer,
      });
      model.renameTab("All Pods");
      model.reloadLogs();
    } else {
      model.updateLogTabData({
        selectedPodId: option.value.getId(),
        selectedContainer: option.value.getAllContainers()[0]?.name,
      });
      model.renameTab(`Pod ${option.value.getName()}`);
      model.reloadLogs();
    }
  };

  const containerSelectOptions = [
    {
      label: "Containers",
      options: currentPod.getContainers().map((container) => ({
        value: container,
        label: container.name,
      })),
    },
    {
      label: "Init Containers",
      options: currentPod.getInitContainers().map((container) => ({
        value: container,
        label: container.name,
      })),
    },
  ];

  return (
    <div className="LogResourceSelector flex gaps align-center">
      <span>Namespace</span> <Badge data-testid="namespace-badge" label={currentPod.getNs()} />
      {owner && (
        <>
          <span>Owner</span> <Badge data-testid="namespace-badge" label={`${owner.kind} ${owner.name}`} />
        </>
      )}
      <span>Pod</span>
      <Select<Pod | "all-pods", SelectOption<Pod | "all-pods">, false>
        options={podOptions}
        value={isAllPodsMode ? "all-pods" : pod}
        isClearable={false}
        onChange={onPodChange}
        className="pod-selector"
        menuClass="pod-selector-menu"
      />
      <span>Container</span>
      <Select<Container, SelectOption<Container>, false>
        id="container-selector-input"
        options={containerSelectOptions}
        value={container}
        onChange={onContainerChange}
        className="container-selector"
        menuClass="container-selector-menu"
        controlShouldRenderValue
      />
    </div>
  );
});
