import { Svg } from "@/components/ui/Svg";

const RECITERS = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin-Al-Qasim",
  "03": "Abdurrahman as-Sudais",
  "04": "Ibrahim Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
} as const;

interface ReciterSelectorProps {
  selectedReciter: string;
  availableReciters: string[];
  onReciterChange: (reciterId: string) => void;
}

export const ReciterSelector: React.FC<ReciterSelectorProps> = ({
  selectedReciter,
  availableReciters,
  onReciterChange,
}) => {
  const reciterOptions = availableReciters.map((reciter) => ({
    value: reciter,
    label: RECITERS[reciter as keyof typeof RECITERS] || reciter,
  }));

  return (
    <div className="flex-1 grid grid-cols-1 relative">
      <select
        id="qari"
        name="qari"
        value={selectedReciter}
        onChange={(e) => onReciterChange(e.target.value)}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-sm/6 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600"
        aria-label="Select reciter"
      >
        {reciterOptions.map((reciter) => (
          <option key={reciter.value} value={reciter.value}>
            {reciter.label}
          </option>
        ))}
      </select>
      <Svg
        variant="outline"
        width={16}
        height={16}
        draw={["m19.5 8.25-7.5 7.5-7.5-7.5"]}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};
