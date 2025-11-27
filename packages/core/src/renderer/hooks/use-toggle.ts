import { useState } from "react";

export function useToggle(initial: boolean): [value: boolean, toggle: () => void] {
  const [val, setVal] = useState(initial);

  return [val, () => setVal(!val)];
}
