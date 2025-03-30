export function getRandom10DigitNumber(length: number = 10): string {
  return Array.from(
    { length },
    () => "123456789"[Math.floor(Math.random() * 9)]
  ).join("");
}
