import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    const id = window.setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
