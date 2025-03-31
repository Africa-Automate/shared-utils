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
exports.getRandomUniqueCustomerNumber = getRandomUniqueCustomerNumber;
const firebase_1 = require("./firebase");
/**
 * @module getRandomUniqueCustomerNumber
 * @description
 * This module is responsible for generating a **globally unique 12-digit customer number (UCN)** to be used across the system
 * for identifying customers. It guarantees uniqueness by checking against existing records in the `Customers` Firestore collection.
 *
 * ## Purpose
 * Many systems require a simple, numeric, and consistent customer identifier that:
 * - Can be used for sorting or indexing.
 * - Is hard to guess or predict.
 * - Doesn’t rely on external metadata (like email or phone number).
 *
 * This utility ensures that generated identifiers:
 * - Are always 12-digit numeric strings.
 * - Are **guaranteed unique** within the `Customers` Firestore collection.
 *
 * ---
 *
 * ## Behavior
 * - The function randomly generates a number between `100000000000` and `999999999999` (inclusive).
 * - It queries Firestore using `where("unique_customer_number", "==", value)` to check for existing matches.
 * - If a conflict is found, it regenerates a number and retries until a unique number is confirmed.
 * - The function is recursive in logic, but iterative in implementation.
 *
 * ---
 *
 * ## Expected Output
 * @returns {Promise<string>} A 12-digit unique numeric string that does **not** exist in the `Customers` collection.
 *
 * ---
 *
 * ## Edge Cases & Notes
 * - In extreme edge cases with massive datasets, this function could take longer due to repeated regeneration attempts.
 * - There is no hard retry limit — the loop continues until a unique number is found.
 * - The output **will always be exactly 12 digits**.
 *
 * ---
 *
 * ## Example Usage
 * ```ts
 * const newUCN = await getRandomUniqueCustomerNumber();
 * await db.collection("Customers").doc(newUCN).set({ unique_customer_number: newUCN });
 * ```
 *
 * ---
 *
 * @throws {Error} If Firestore read operations fail or are interrupted.
 */
function getRandomUniqueCustomerNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const minNumber = Math.pow(10, 11);
        const maxNumber = Math.pow(10, 12) - 1;
        let customerNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        while (!(yield isCustomerNumberUnique(customerNumber.toString()))) {
            customerNumber =
                Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        }
        return String(customerNumber);
    });
}
function isCustomerNumberUnique(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const querySnapshot = yield firebase_1.db
            .collection("Customers")
            .where("unique_customer_number", "==", value)
            .limit(1)
            .get();
        return querySnapshot.empty;
    });
}
