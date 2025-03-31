"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMatch = extractMatch;
/**
 * @function extractMatch
 * @description
 * Extracts the **first capturing group** from the given input string using the provided regular expression.
 * This is useful for parsing structured text like SMS messages, emails, logs, or system responses.
 *
 * ---
 *
 * @param {string} input - The string to search within.
 * @param {RegExp} regex - The regular expression to apply. Must contain at least one capturing group.
 *
 * @returns {string | null}
 * Returns the **first match group's value** if a match is found; otherwise, returns `null`.
 *
 * ---
 *
 * @example
 * ```ts
 * const message = "Deposit of E300.00 Ref.793204";
 * const amount = extractMatch(message, /E(\d+\.?\d*)/); // "300.00"
 * const ref = extractMatch(message, /Ref\.(\d+)/);      // "793204"
 * ```
 *
 * @note
 * Only the **first capturing group** is returned. To extract multiple groups or matches, use `.matchAll()` or custom logic.
 */
function extractMatch(input, regex) {
    const match = input.match(regex);
    return match ? match[1] : null;
}
