import type { IComputedValue } from "mobx";

export interface AppPreferenceTabRegistration {
  title: string;
  id: string;
  orderNumber?: number;
  visible?: IComputedValue<boolean>;
}
