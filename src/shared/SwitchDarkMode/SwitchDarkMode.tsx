import React, { useEffect, useState } from "react";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";
export interface SwitchDarkModeProps {
  className?: string;
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      toDark();
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    setIsDarkMode(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
  };

  const toLight = () => {
    setIsDarkMode(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
  };

  function _toogleDarkMode() {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  }

  return (
    <></>
  );
};

export default SwitchDarkMode;
