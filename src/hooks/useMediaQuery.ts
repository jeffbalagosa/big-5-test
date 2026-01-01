import { useSyncExternalStore, useCallback } from "react";

/**
 * Custom hook that returns true if the window matches the provided media query.
 * @param query The media query to match (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
