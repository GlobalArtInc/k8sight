import { useEffect } from "react";

export function useResizeObserver(element: Element | undefined | null, callback: ResizeObserverCallback) {
  useEffect(() => {
    if (element) {
      const observer = new ResizeObserver(callback);

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    return undefined;
  }, [element, callback]);
}
