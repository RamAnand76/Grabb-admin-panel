import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";

const THEMES = [
  {
    name: "light",
    Icon: Sun,
  },
  {
    name: "dark",
    Icon: Moon,
  },
];

export function ThemeToggleSwitch({ isCollapsed }: { isCollapsed?: boolean }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isCollapsed) {
    const ActiveIcon = theme === "dark" ? Moon : Sun;
    return (
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="group cursor-pointer rounded-full p-2.5 text-gray-400 hover:text-white hover:bg-white/10 outline-0 transition-colors"
      >
        <span className="sr-only">Switch mode</span>
        <ActiveIcon className="size-6 shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="group cursor-pointer rounded-full bg-gray-3 p-1.25 text-dark outline-0 hover:outline-primary focus:outline-primary focus-visible:outline dark:bg-[#020D1A] dark:text-current"
    >
      <span className="sr-only">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </span>

      <span aria-hidden className="relative flex gap-2.5">
        {/* Indicator */}
        <span className="absolute size-9.5 rounded-full border border-gray-200 bg-white transition-all dark:translate-x-12 dark:border-none dark:bg-dark-2 dark:group-hover:bg-dark-3" />

        {THEMES.map(({ name, Icon }) => (
          <span
            key={name}
            className={cn(
              "relative grid size-9.5 place-items-center rounded-full",
              name === "dark" && "dark:text-white",
            )}
          >
            <Icon />
          </span>
        ))}
      </span>
    </button>
  );
}
