"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAndRethrowError = logAndRethrowError;
const firebase_1 = require("./firebase");
function logAndRethrowError(error) {
    console.error(error);
    if (error instanceof firebase_1.HttpsError) {
        throw new firebase_1.HttpsError(error.code, error.message, error.details);
    }
    throw new firebase_1.HttpsError("unknown", "Unexpected error occurred.");
}
