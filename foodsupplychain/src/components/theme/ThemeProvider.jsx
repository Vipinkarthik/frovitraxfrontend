import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (selectedTheme === "Dark") {
      root.classList.add("dark");
    } else if (selectedTheme === "Light") {
      root.classList.add("light");
    } else if (selectedTheme === "Auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    }

    localStorage.setItem("theme", selectedTheme);
  };

  return children;
}
