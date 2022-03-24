import React, { useEffect, useState } from "react";

interface Props {
  startTime: number;
  endTime: number;
  stepDuration: number;
  onDone?: () => void;
  timeText?: (time: string) => string;
}

export const Timer = (props: Props) => {
  const [time, setTime] = useState(props.startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time - 1 === props.endTime) if (props.onDone) return props.onDone();
      setTime(time - 1);
    }, props.stepDuration);
    return () => clearInterval(interval);
  });
  return (
    <div>
      <p>{props.timeText ? props.timeText(time.toString()) : time}</p>
    </div>
  );
};
