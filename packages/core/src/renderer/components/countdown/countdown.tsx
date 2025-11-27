import { observer } from "mobx-react";
import React from "react";

import type { IComputedValue } from "mobx";
import type { HTMLAttributes } from "react";

interface CountdownProps extends HTMLAttributes<HTMLSpanElement> {
  secondsTill: IComputedValue<number>;
}

export const Countdown = observer(({ secondsTill, ...props }: CountdownProps) => (
  <span {...props}>{secondsTill.get()}</span>
));
