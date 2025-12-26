import { Button } from "@/components/ui/Button";
import type { SurahDetail } from "@/types";

interface SurahNavigationProps {
  content: SurahDetail;
  currentId: string | undefined;
}

/**
 * Pagination component for surah navigation
 */
export const Pagination = ({
  content,
  currentId,
}: Readonly<SurahNavigationProps>) => (
  <footer
    aria-label="Pagination"
    className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm"
  >
    <div className="flex justify-between items-center">
      {content.suratSebelumnya && (
        <Button
          href={`/surat/${content.suratSebelumnya.nomor}`}
          className="px-4 py-1 text-start"
          aria-label="Previous surah"
        >
          ← {content.suratSebelumnya.namaLatin}
        </Button>
      )}

      <div className="flex-1 text-center mx-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Surat ke {currentId} dari 114
        </p>
      </div>

      {content.suratSelanjutnya && (
        <Button
          href={`/surat/${content.suratSelanjutnya.nomor}`}
          className="px-4 py-1 text-end"
          aria-label="Next surah"
        >
          {content.suratSelanjutnya.namaLatin} →
        </Button>
      )}
    </div>
  </footer>
);

Pagination.displayName = "Pagination";
