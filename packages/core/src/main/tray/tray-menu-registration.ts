import type { IComputedValue } from "mobx";

export interface TrayMenuRegistration {
  label?: string | IComputedValue<string>;
  click?: (menuItem: TrayMenuRegistration) => void;
  id?: string;
  type?: "normal" | "separator" | "submenu";
  toolTip?: string;
  enabled?: boolean | IComputedValue<boolean>;
  submenu?: TrayMenuRegistration[];
  visible?: IComputedValue<boolean>;
}
