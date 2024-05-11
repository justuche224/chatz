"use client";

import {
  FaBars,
  FaBell,
  FaBorderAll,
  FaComments,
  FaDesktop,
  FaMoon,
  FaPlus,
  FaSearch,
  FaSun,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserButton } from "../auth/UserButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Theme = () => {
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

  const ThemeIcon = () => {
    if (theme === "system") {
      return <FaDesktop size={17} className="text-secondary-foreground" />;
    }
    if (theme === "dark") {
      return <FaMoon size={17} className="text-secondary-foreground" />;
    }
    if (theme === "light") {
      return <FaSun size={17} className="text-secondary-foreground" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <ThemeIcon />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[998]">
        <DropdownMenuLabel>Themes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options?.map((opt) => (
          <DropdownMenuItem
            key={opt.text}
            title={opt.text}
            onClick={() => setTheme(opt.text)}
            className={`text-xl pl-1 m-1 cursor-pointer ${
              theme === opt.text && "text-destructive"
            }`}
          >
            {opt.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const Navbar = () => {
  const currentPath = usePathname();
  return (
    <nav
      aria-label="Navigation bar"
      className="w-full bg-secondary h-11 flex items-center justify-between px-3 fixed top-0 z-[998] border-b shadow border-destructive"
    >
      <div className="flex items-center justify-between gap-2">
        <Image
          src="/images/chatz.svg"
          width={35}
          height={35}
          priority
          alt="logo"
        />
        <Link href="/chat">
          <span
            className={
              currentPath == "/chat"
                ? "bg-transparent flex justify-center items-center p-2 rounded-full"
                : "bg-destructive flex justify-center items-center p-2 rounded-full"
            }
          >
            <FaComments size={17} className="text-secondary-foreground" />
          </span>
        </Link>
        <Link href="/feed">
          <span
            className={
              currentPath == "/feed"
                ? "bg-transparent flex justify-center items-center p-2 rounded-full"
                : "bg-destructive flex justify-center items-center p-2 rounded-full"
            }
          >
            <FaBorderAll size={17} className="text-secondary-foreground" />
          </span>
        </Link>
        <span>
          <FaBars size={28} className="text-secondary-foreground" />
        </span>
      </div>
      <div></div>
      <div className="flex items-center justify-between gap-2">
        <Theme />
        {/* <span className="bg-destructive flex justify-center items-center p-2 rounded-full">
          <FaPlus size={17} className="text-secondary-foreground" />
        </span> */}
        <Link href="/search">
          <span
            className={
              currentPath == "/search"
                ? "bg-transparent flex justify-center items-center p-2 rounded-full"
                : "bg-destructive flex justify-center items-center p-2 rounded-full"
            }
          >
            <FaSearch size={17} className="text-secondary-foreground" />
          </span>
        </Link>
        <Link href="/notifications">
          <span
            className={
              currentPath == "/notifications"
                ? "bg-transparent flex justify-center items-center p-2 rounded-full"
                : "bg-destructive flex justify-center items-center p-2 rounded-full"
            }
          >
            <FaBell size={17} className="text-secondary-foreground" />
          </span>
        </Link>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
