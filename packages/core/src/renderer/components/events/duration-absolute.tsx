import React from "react";
import { ReactiveDuration } from "../duration/reactive-duration";
import { LocaleDate } from "../locale-date";

export interface DurationAbsoluteTimestampProps {
  timestamp: string | undefined;
}

export const DurationAbsoluteTimestamp = ({ timestamp }: DurationAbsoluteTimestampProps) => {
  if (!timestamp) {
    return <>{"<unknown>"}</>;
  }

  return (
    <>
      <ReactiveDuration timestamp={timestamp} />
      {" ago "}
      (
      <LocaleDate date={timestamp} />)
    </>
  );
};
