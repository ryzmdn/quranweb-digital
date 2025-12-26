import { useCallback, useEffect, useRef, useMemo } from "react";
import type { Ayat, Surah, Tafsir } from "@/types";
import { Button } from "@/components/ui/Button";
import { Svg } from "@/components/ui/Svg";

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  surah: Surah;
  ayat: Ayat;
  tafsirData: Tafsir | null;
  className?: string;
}

function useDisableScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev || "";
    };
  }, [active]);
}

function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    (first ?? el).focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, containerRef]);
}

export const TafsirModal = ({
  isOpen,
  onClose,
  surah,
  ayat,
  tafsirData,
  className,
}: Readonly<TafsirModalProps>) => {
  useDisableScroll(isOpen);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(isOpen, containerRef);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const currentTafsir = useMemo(() => {
    if (!tafsirData) return null;
    return Array.isArray(tafsirData.tafsir)
      ? tafsirData.tafsir[ayat.nomorAyat - 1]
      : tafsirData.tafsir;
  }, [tafsirData, ayat.nomorAyat]);

  if (!isOpen || !tafsirData) return null;

  return (
    <div className={className}>
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 backdrop-blur-sm bg-gray-950/20 dark:bg-gray-950/55"
        aria-hidden={!isOpen}
      >
        <div className="relative size-full">
          <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tafsir-title"
            tabIndex={-1}
            className="fixed top-1/2 left-1/2 -translate-1/2 z-50 overflow-y-auto size-full max-w-2xl rounded-lg bg-gray-50 dark:bg-gray-950 px-4 pt-5 pb-4 text-start shadow-xl sm:flex sm:items-start sm:p-6 sm:max-h-150"
          >
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
              <header className="flex justify-between items-center pb-3.5 border-b border-gray-200 dark:border-gray-800">
                <h3
                  id="tafsir-title"
                  className="text-base font-semibold text-gray-900 dark:text-gray-100"
                >
                  Tafsir Surat {surah.namaLatin} Ayat {ayat.nomorAyat}
                </h3>

                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <Svg
                    variant="outline"
                    width={24}
                    height={24}
                    draw={["M6 18L18 6M6 6l12 12"]}
                  />
                </Button>
              </header>

              <div className="w-full my-5">
                <div className="text-right py-8">
                  <p
                    className="text-4xl/relaxed text-gray-900 dark:text-gray-100 font-serif font-medium"
                    dir="rtl"
                    lang="ar"
                  >
                    {ayat.teksArab}
                  </p>
                  <p className="text-base/7 text-gray-600 dark:text-gray-400 italic mt-2">
                    {ayat.teksLatin}
                  </p>
                  <p className="font-serif text-base/7 text-gray-700 dark:text-gray-300 mt-3.5">
                    {ayat.teksIndonesia}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="w-full h-px bg-gray-200 mt-2 mb-8"
                />

                <div className="w-full space-y-4">
                  <p className="font-serif text-base/7 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {typeof currentTafsir === "string"
                      ? currentTafsir
                      : "tafsir" in (currentTafsir || {})
                      ? (currentTafsir as { tafsir: string }).tafsir
                      : "kemenangan" in (currentTafsir || {})
                      ? (currentTafsir as { kemenangan: string }).kemenangan
                      : ""}
                  </p>
                </div>
              </div>

              <footer className="w-full pt-5 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-green-500 hover:text-green-400"
                  aria-label="Close modal"
                >
                  ← Kembali
                </Button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TafsirModal.displayName = "TafsirModal";
