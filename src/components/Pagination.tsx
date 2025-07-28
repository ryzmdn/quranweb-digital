import { Button } from "@/components/optimizing/Button";
import type { SurahDetail } from "@/assets/types/surah";

interface SurahNavigationProps {
  content: SurahDetail;
  currentId: string | undefined;
}

export const Pagination: React.FC<SurahNavigationProps> = ({
  content,
  currentId,
}) => {
  return (
    <footer
      aria-label="Pagination"
      className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
    >
      <div className="flex justify-between items-center">
        {content.suratSebelumnya && (
          <Button
            href={`/surat/${content.suratSebelumnya.nomor}`}
            className="px-4 py-1 text-start"
            aria-label="Previous content"
          >
            ← {content.suratSebelumnya.namaLatin}
          </Button>
        )}

        <div className="flex-1 text-center mx-4">
          <p className="text-sm text-gray-500">Surat ke {currentId} dari 114</p>
        </div>

        {content.suratSelanjutnya && (
          <Button
            href={`/surat/${content.suratSelanjutnya.nomor}`}
            className="px-4 py-1 text-end"
            aria-label="Next content"
          >
            {content.suratSelanjutnya.namaLatin} →
          </Button>
        )}
      </div>
    </footer>
  );
};
