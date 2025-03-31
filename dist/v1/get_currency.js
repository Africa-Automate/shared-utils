"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrency = getCurrency;
function getCurrency(countryCode) {
    switch (countryCode) {
        case "SWZ":
            return "E";
        case "SA":
            return "R";
        case "MZ":
            return "MT";
        default:
            return "";
    }
}
