import React from "react";

import type { StrictReactNode } from "@kubesightapp/utilities";

interface FormControlLabelProps {
  control: React.ReactElement<any, any>;
  label: StrictReactNode;
}

/**
 * @deprecated Use <Switch/> instead from "../switch.tsx".
 */
export function FormSwitch(props: FormControlLabelProps & { children?: StrictReactNode }) {
  const ClonedElement = React.cloneElement(props.control, {
    children: <span>{props.label}</span>,
  });

  return ClonedElement;
}
