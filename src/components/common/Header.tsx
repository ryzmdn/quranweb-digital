import { useLocation } from "react-router";
import { Button } from "@/components/ui/Button";
import { Svg } from "@/components/ui/Svg";
import { Logo } from "@/components/common/Logo";
import { useTheme } from "@/hooks/useTheme";

export const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isHidden = location.pathname.includes("surat");

  if (isHidden) return null;

  return (
    <header className="absolute top-0 left-0 w-full bg-gray-50 dark:bg-gray-950 backdrop-blur-md border-b border-gray-100 dark:border-gray-900">
      <div className="flex items-center justify-between px-6 py-3.5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center p-1 bg-linear-to-br from-emerald-600 to-emerald-500 size-11 rounded-full shadow-sm">
            <Logo />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Al-Quran Digital
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Mushaf Digital Modern
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="size-8 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Svg
              variant="outline"
              width={20}
              height={20}
              draw={[
                theme === "dark"
                  ? "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  : "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z",
              ]}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";
