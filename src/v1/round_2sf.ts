export function round2SF(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) {
    throw new Error("Invalid number format");
  }
  return num.toFixed(2);
}
