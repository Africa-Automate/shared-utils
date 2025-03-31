"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom10DigitNumber = getRandom10DigitNumber;
function getRandom10DigitNumber(length = 10) {
    return Array.from({ length }, () => "123456789"[Math.floor(Math.random() * 9)]).join("");
}
