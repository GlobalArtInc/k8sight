import type { IComputedValue } from "mobx";

interface WorkloadsOverviewDetailComponents {
  Details: React.ComponentType<{}>;
}

export interface WorkloadsOverviewDetailRegistration {
  components: WorkloadsOverviewDetailComponents;
  priority?: number;
  visible?: IComputedValue<boolean>;
}
