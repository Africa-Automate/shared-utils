"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateAndTime = getDateAndTime;
const admin = __importStar(require("firebase-admin"));
function getDateAndTime() {
    const currentDate = new Date();
    // Formatting the current date and time as "MM-DD-YYYY HH:MM:SS"
    const formattedDateAndTime = currentDate.toLocaleString("en-US", {
        timeZone: "Africa/Johannesburg",
        hourCycle: "h24", // Set the time zone to South Africa
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const dateAndTime = formattedDateAndTime.replace(/,/g, "");
    // Extracting time and date components
    const dateAndTimeParts = dateAndTime.split(" ");
    const timeOnly = dateAndTimeParts[1];
    const dateOnly = dateAndTimeParts[0];
    const dateParts = dateOnly.split("/");
    const formattedDateOnly = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    const TIMESTAMP = admin.firestore.Timestamp.now().toMillis();
    // Extracting time and date components
    const quarterDate = new Date(currentDate);
    quarterDate.setDate(currentDate.getDate() + 90);
    const lifeDate = new Date(currentDate);
    lifeDate.setDate(currentDate.getDate() + 40000);
    const now = new Date().toISOString();
    // Formatting the tomorrow's date as "MM-DD-YYYY"
    const formattedLifeDate = lifeDate.toLocaleString("en-US", {
        timeZone: "Africa/Johannesburg",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const lifeDateParts = formattedLifeDate.split("/");
    const formattedLife = `${lifeDateParts[0]}-${lifeDateParts[1]}-${lifeDateParts[2]}`;
    // Formatting the tomorrow's date as "MM-DD-YYYY"
    const formattedquarterDate = quarterDate.toLocaleString("en-US", {
        timeZone: "Africa/Johannesburg",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const quarterDateParts = formattedquarterDate.split("/");
    const formattedQuarter = `${quarterDateParts[0]}-${quarterDateParts[1]}-${quarterDateParts[2]}`;
    return {
        time: timeOnly,
        date: formattedDateOnly,
        timestamp: TIMESTAMP,
        unformatedTimestamp: admin.firestore.Timestamp.now(),
        date_quarter: formattedQuarter,
        date_life: formattedLife,
        iso_string_date: now,
    };
}
