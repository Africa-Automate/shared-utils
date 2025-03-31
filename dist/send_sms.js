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
exports.sendSMS = sendSMS;
const get_date_and_time_1 = require("../src/v1/get_date_and_time");
const firebase_1 = require("../src/v1/firebase");
/**
 * Sends an SMS message based on the recipient's country code.
 *
 * @param {string} countryCode - The country code of the recipient (e.g., "SA", "MZ", or other).
 * @param {string} message - The message content to be sent.
 * @param {string} cellNumber - The recipient's phone number.
 * @returns {Promise<void>} Resolves when the SMS request is successfully pushed to the database.
 * @throws {Error} If there are any issues with pushing the request to the database.
 */
function sendSMS(countryCode, message, cellNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeVariable = (0, get_date_and_time_1.getDateAndTime)();
        if (countryCode === "SA") {
            yield firebase_1.rtdb.ref("Green").child("MessegingRequests").push({
                sendTo: cellNumber,
                message: message,
                country: "SA",
            });
        }
        else if (countryCode === "MZ") {
            yield firebase_1.rtdb.ref("Green").child("MessegingRequests").push({
                sendTo: cellNumber,
                message: message,
                country: "MZ",
            });
        }
        else {
            yield firebase_1.db.collection("Requests").doc().set({
                phoneNumber: cellNumber,
                requestType: "sms",
                timestamp: timeVariable.timestamp,
                country: "eSwatini",
                status: "waiting",
                message: message,
            });
        }
    });
}
