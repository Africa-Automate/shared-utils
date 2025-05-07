"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdAndClaims = getUserIdAndClaims;
const firebase_1 = require("./firebase");
/**
 * Retrieves a Firebase Auth user's UID and custom claims using their UCN.
 * Returns `{ uid: undefined, claims: {} }` if the user is not found.
 *
 * @param {string} ucn - The user's Unique Customer Number.
 * @returns {Promise<{ uid: string, claims: any }>}
 */
function getUserIdAndClaims(ucn) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = `${ucn}@informaltraders.tech`;
        try {
            const userRecord = yield firebase_1.auth.getUserByEmail(email);
            return {
                uid: userRecord.uid,
                claims: userRecord.customClaims || {},
            };
        }
        catch (err) {
            if (err.code === "auth/user-not-found") {
                console.warn(`⚠️ No Firebase user found for UCN: ${ucn}`);
            }
            else {
                console.error(`❌ Unexpected error fetching user for UCN ${ucn}:`, err);
                throw err;
            }
            return { uid: undefined, claims: {} };
        }
    });
}
