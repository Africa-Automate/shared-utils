/**
 * @function generateCSVBuffer
 * @description
 * Converts a 2D array of strings into a valid CSV format and returns it as a UTF-8 encoded `Buffer`.
 * Useful for generating downloadable CSV files (e.g. reports, exports, logs) in memory.
 *
 * ---
 *
 * @param {string[][]} rows - A two-dimensional array representing CSV data:
 * - Each inner array corresponds to one row.
 * - Each string in the inner array represents a cell value.
 *
 * @returns {Buffer}
 * A Node.js `Buffer` containing the generated CSV data in UTF-8 encoding.
 *
 * ---
 *
 * @example
 * ```ts
 * const data = [
 *   ['Name', 'Age', 'Country'],
 *   ['Alice', '30', 'USA'],
 *   ['Bob', '25', 'UK'],
 * ];
 *
 * const buffer = generateCSVBuffer(data);
 * fs.writeFileSync('users.csv', buffer); // Saves a valid CSV file
 * ```
 *
 * @note
 * - This function **does not escape** special characters like quotes or commas inside values.
 *   Use a CSV-safe encoder if your data contains such characters.
 * - Assumes **simple, clean string values**.
 */

export function generateCSVBuffer(rows: string[][]): Buffer {
  const csvString = rows.map((row) => row.join(",")).join("\n");
  return Buffer.from(csvString);
}
