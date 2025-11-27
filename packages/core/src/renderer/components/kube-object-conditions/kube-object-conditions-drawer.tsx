import { KubeObject } from "@kubesightapp/kube-object";
import { observer } from "mobx-react";
import React from "react";
import { Badge } from "../badge";
import { DrawerItem } from "../drawer";
import { getClassName, getTooltip } from "./components";
import { sortConditions } from "./utils";

import type { KubeObjectMetadata, KubeObjectStatus } from "@kubesightapp/kube-object";

export interface KubeObjectConditionsDrawerProps {
  object: KubeObject;
  conditionTypePriorities?: Record<string, number>;
}

export const KubeObjectConditionsDrawer = observer((props: KubeObjectConditionsDrawerProps) => {
  const { object, conditionTypePriorities } = props;

  if (!object) {
    return null;
  }

  if (!(object instanceof KubeObject)) {
    return null;
  }

  const conditions = (object as KubeObject<KubeObjectMetadata, KubeObjectStatus>).status?.conditions;

  if (!conditions?.length) return null;

  return (
    <DrawerItem name="Conditions" className="conditions" hidden={!conditions?.length} labelsOnly>
      {sortConditions(conditions, conditionTypePriorities)?.map((condition) => {
        return (
          <Badge
            key={condition.type}
            label={condition.type}
            disabled={condition.status === "False"}
            tooltip={getTooltip(condition, `drawer-${object.getId()}-condition-${condition.type}`)}
            tooltipFormatters={{ tableView: true }}
            className={getClassName(condition)}
          />
        );
      })}
    </DrawerItem>
  );
});
