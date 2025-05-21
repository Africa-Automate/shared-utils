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
exports.logCustomerChange = logCustomerChange;
const get_date_and_time_1 = require("./get_date_and_time");
const firebase_1 = require("./firebase");
const send_email_1 = require("./send_email");
function logCustomerChange(_a) {
    return __awaiter(this, arguments, void 0, function* ({ ucn, source, rawNewData, originalData, balance_update, auth_uid, auth_email, request_data, device_info, transaction, }) {
        var _b, _c;
        try {
            if (!ucn || !rawNewData || !originalData) {
                console.warn("⚠️ logCustomerChange: Missing required fields.");
                return;
            }
            // 🔁 Generate field-level diffs
            const changes = {};
            const allKeys = new Set([
                ...Object.keys(originalData),
                ...Object.keys(rawNewData),
            ]);
            for (const key of allKeys) {
                const oldVal = (_b = originalData[key]) !== null && _b !== void 0 ? _b : null;
                const newVal = (_c = rawNewData[key]) !== null && _c !== void 0 ? _c : null;
                if (oldVal !== newVal) {
                    changes[key] = { old: oldVal, new: newVal };
                }
            }
            if (Object.keys(changes).length === 0) {
                console.log(`🟡 No meaningful changes to log for ${ucn}`);
                return;
            }
            const now = (0, get_date_and_time_1.getDateAndTime)();
            const fieldNames = Object.keys(changes);
            const balanceFields = [
                "account_balance",
                "savings_balance",
                "monthly_balance",
            ];
            const computedBalanceUpdate = fieldNames.some((field) => balanceFields.includes(field));
            // 🧾 Final log entry
            const logEntry = {
                ucn,
                changes,
                triggered_by: source,
                date: now.date,
                date_iso: now.iso_string_date,
                timestamp: now.timestamp,
                field_names: fieldNames,
                request_data: request_data,
                field_count: fieldNames.length,
                balance_update: balance_update !== null && balance_update !== void 0 ? balance_update : computedBalanceUpdate,
            };
            if (auth_uid)
                logEntry.auth_uid = auth_uid;
            if (auth_email)
                logEntry.auth_email = auth_email;
            if (device_info)
                logEntry.device_info = device_info;
            const logRef = firebase_1.db.collection("CustomerChangeLogs").doc();
            if (transaction) {
                transaction.set(logRef, logEntry);
            }
            else {
                yield logRef.set(logEntry);
            }
        }
        catch (error) {
            const now = (0, get_date_and_time_1.getDateAndTime)();
            const errorLog = {
                ucn,
                error: String(error),
                triggered_by: source,
                date: now.date,
                date_iso: now.iso_string_date,
                timestamp: now.timestamp,
            };
            if (auth_uid)
                errorLog.auth_uid = auth_uid;
            if (auth_email)
                errorLog.auth_email = auth_email;
            if (device_info)
                errorLog.device_info = device_info;
            yield firebase_1.db.collection("CustomerChangeLogsErrors").add(errorLog);
            yield (0, send_email_1.sendEmail)("Customer Change Log Failed", `${String(error)}.<br/> UCN: ${ucn}`, [
                "sithembiso.dlamini@africaautomate.tech",
                "lindani.dlamini@africaautomate.tech",
            ]);
        }
    });
}
