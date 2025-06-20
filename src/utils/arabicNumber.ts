export function arabicNumber(num: number): string {
  const arabic: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/\d/g, (match: string) => {
    return arabic[parseInt(match)];
  });
}
