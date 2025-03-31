"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProperCase = toProperCase;
/**
 * Gstring to proper case.
 * @param {string} word - the word to be converted
 */
function toProperCase(word) {
    const otp = word
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(" ");
    return otp;
}
