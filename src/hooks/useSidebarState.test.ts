import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSidebarState } from "./useSidebarState";
import { SIDEBAR } from "../styles/theme";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useSidebarState", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSidebarState());
    expect(result.current.isCollapsed).toBe(false);
    expect(result.current.width).toBe(SIDEBAR.defaultWidth);
  });

  it("should toggle collapsed state", () => {
    const { result } = renderHook(() => useSidebarState());

    act(() => {
      result.current.toggleCollapsed();
    });
    expect(result.current.isCollapsed).toBe(true);
    expect(window.localStorage.getItem("sidebar-collapsed")).toBe("true");

    act(() => {
      result.current.toggleCollapsed();
    });
    expect(result.current.isCollapsed).toBe(false);
    expect(window.localStorage.getItem("sidebar-collapsed")).toBe("false");
  });

  it("should update width", () => {
    const { result } = renderHook(() => useSidebarState());
    const newWidth = 300;

    act(() => {
      result.current.setWidth(newWidth);
    });
    expect(result.current.width).toBe(newWidth);
    expect(window.localStorage.getItem("sidebar-width")).toBe(
      JSON.stringify(newWidth)
    );
  });

  it("should load initial state from localStorage", () => {
    window.localStorage.setItem("sidebar-collapsed", "true");
    window.localStorage.setItem("sidebar-width", "350");

    const { result } = renderHook(() => useSidebarState());
    expect(result.current.isCollapsed).toBe(true);
    expect(result.current.width).toBe(350);
  });
});
