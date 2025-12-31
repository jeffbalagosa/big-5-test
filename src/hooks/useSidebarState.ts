import { useState, useEffect } from "react";
import { SIDEBAR } from "../styles/theme";

export const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem("sidebar-width");
    return saved ? JSON.parse(saved) : SIDEBAR.defaultWidth;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("sidebar-width", JSON.stringify(width));
  }, [width]);

  const toggleCollapsed = () => setIsCollapsed((prev: boolean) => !prev);

  return {
    isCollapsed,
    width,
    toggleCollapsed,
    setWidth,
  };
};
