"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round2SF = round2SF;
function round2SF(value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
        throw new Error("Invalid number format");
    }
    return num.toFixed(2);
}
