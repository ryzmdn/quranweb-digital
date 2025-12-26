import { useLocation } from "react-router";
import { Logo } from "@/components/common/Logo";

/**
 * Footer component shown on home page
 */
export const Footer = () => {
  const location = useLocation();
  const year = new Date().getFullYear();

  const isHidden = location.pathname.includes("surat");

  if (isHidden) return null;

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto pt-10 px-4 pb-6">
        <div className="flex items-center justify-center gap-3 mb-4 text-center">
          <div className="flex justify-center items-center p-1 bg-gradient-to-br from-emerald-600 to-emerald-500 size-10 rounded-full shadow-sm">
            <Logo />
          </div>
          <h3 className="text-xl text-gray-800 dark:text-gray-200 font-semibold">
            Al-Quran Digital
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-center font-medium my-6 max-w-md mx-auto">
          Platform digital terpercaya untuk membaca, mendengarkan, dan
          mempelajari Al-Quran
        </p>
        <div className="flex items-center justify-center gap-6 text-xs text-gray-600 dark:text-gray-400">
          <span>© {year} Al-Quran Digital</span>
          <span>•</span>
          <span>Dibuat dengan ❤️</span>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
