/**
 * Convert numbers to Arabic numerals
 * @param num - Number to convert
 * @returns String with Arabic numerals
 */
export function formatArabicNumber(num: number): string {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((digit) => arabicNumbers[parseInt(digit)])
    .join("");
}
