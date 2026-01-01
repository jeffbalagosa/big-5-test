import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners: (() => void)[] = [];

  beforeEach(() => {
    listeners = [];
    const mockMatchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn((type: string, listener: () => void) => {
        if (type === "change") listeners.push(listener);
      }),
      removeEventListener: vi.fn((type: string, listener: () => void) => {
        if (type === "change") {
          listeners = listeners.filter((l) => l !== listener);
        }
      }),
      dispatchEvent: vi.fn(),
    }));
    vi.stubGlobal("matchMedia", mockMatchMedia);
  });

  it("should return initial match state", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(
        (query: string) =>
          ({
            matches: true,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          } as unknown as MediaQueryList)
      )
    );

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("should update when media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      // Simulate the media query changing
      // We need to update the mock's matches value before calling listeners
      vi.stubGlobal(
        "matchMedia",
        vi.fn(
          (query: string) =>
            ({
              matches: true,
              media: query,
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
            } as unknown as MediaQueryList)
        )
      );

      listeners.forEach((l) => l());
    });

    expect(result.current).toBe(true);
  });

  it("should clean up listeners on unmount", () => {
    const removeEventListenerSpy = vi.fn();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(
        (query: string) =>
          ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: removeEventListenerSpy,
          } as unknown as MediaQueryList)
      )
    );

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
