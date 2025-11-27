import React from "react";

import type { Size } from "react-virtualized-auto-sizer";

export default ({ children }: { children: (size: Size) => React.ReactNode }) => {
  return (
    <div>
      {children({
        height: 420000,
        width: 100,
      })}
    </div>
  );
};
