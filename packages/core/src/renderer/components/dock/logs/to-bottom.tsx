import { Icon } from "@kubesightapp/icon";
import React from "react";

export function ToBottom({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="absolute top-3 right-3 z-10 rounded-md flex align-center px-1 py-1 pl-3"
      style={{ backgroundColor: "var(--blue)" }}
      onClick={(evt) => {
        evt.currentTarget.blur();
        onClick();
      }}
    >
      To bottom
      <Icon small material="expand_more" />
    </button>
  );
}
