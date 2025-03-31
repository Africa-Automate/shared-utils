"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionId = generateSessionId;
/**
 * Generates a random alphanumeric session ID.
 *
 * @function generateSessionId
 * @param {number} [length=7] - The length of the session ID (default is 7).
 * @returns {string} A randomly generated uppercase session ID.
 *
 * @example
 * // Generate a default 7-character session ID
 * const sessionId = generateSessionId();
 * console.log(sessionId); // Output: "A1B2C3D"
 *
 * @example
 * // Generate a custom-length session ID (e.g., 10 characters)
 * const customSessionId = generateSessionId(10);
 * console.log(customSessionId); // Output: "A1B2C3D4E5"
 */
function generateSessionId(length = 7) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(length)]
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("")
        .toUpperCase();
}
