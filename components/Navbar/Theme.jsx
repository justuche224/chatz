"use client";

import { useState, useEffect } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function Themes() {
  const options = [
    {
      icon: <FaSun />,
      text: "light",
    },
    {
      icon: <FaMoon />,
      text: "dark",
    },
    {
      icon: <FaDesktop />,
      text: "system",
    },
  ];
  const [theme, setTheme] = useState("system"); // Initial state

  useEffect(() => {
    // Access localStorage within useEffect to avoid server-side issues
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  useEffect(() => {
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      switch (theme) {
        case "dark":
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
          break;
        case "light":
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
          break;
        default:
          localStorage.removeItem("theme");
          element.classList.toggle("dark", darkQuery.matches);
          break;
      }
    };

    updateTheme(); // Apply initial theme

    darkQuery.addEventListener("change", updateTheme);

    return () => darkQuery.removeEventListener("change", updateTheme);
  }, [theme]);

  return (
    <div className="duration-100 dark:bg-slate-800 bg-gray-200 rounded">
      {options?.map((opt) => (
        <button
          key={opt.text}
          title={opt.text}
          onClick={() => setTheme(opt.text)}
          className={`w-8 h-8 leading-9 text-xl rounded-full pl-1 m-1 ${
            theme === opt.text && "text-sky-600"
          }`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
