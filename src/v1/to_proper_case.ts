/**
 * Gstring to proper case.
 * @param {string} word - the word to be converted
 */
export function toProperCase(word: string): string {
  const otp: string = word
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
  return otp;
}
