import React from "react";
import { Switch } from "./switch";

import type { StrictReactNode } from "@kubesightapp/utilities";

export interface SwitcherProps {
  disabled?: boolean;
  children?: StrictReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  name?: string;
}

/**
 * @deprecated Use <Switch/> instead from "../switch.tsx".
 */
export function Switcher({ disabled, checked, onChange, name, children }: SwitcherProps) {
  return (
    <Switch disabled={disabled} checked={checked} name={name} onChange={(checked, event) => onChange?.(event, checked)}>
      {children}
    </Switch>
  );
}
