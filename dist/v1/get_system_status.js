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
exports.getSystemStatus = getSystemStatus;
const functions = __importStar(require("firebase-functions/v1"));
const firebase_1 = require("../v1/firebase");
const messages_1 = require("../v1/messages");
/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
function getSystemStatus(context, country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!context.auth) {
                throw new functions.https.HttpsError("failed-precondition", "User is not authenticated");
            }
            const userEmail = context.auth.token.email;
            const UCN = userEmail === null || userEmail === void 0 ? void 0 : userEmail.split("@")[0];
            // Fetch customer data
            const customerRef = firebase_1.db.collection("Customers");
            const customerSnap = yield customerRef
                .where("unique_customer_number", "==", UCN)
                .get();
            if (customerSnap.empty) {
                throw new functions.https.HttpsError("not-found", (0, messages_1.getMessage)("black_now", "customer_not_found", country));
            }
            const customerData = customerSnap.docs[0].data();
            const customerCountry = customerData.member_country;
            // Fetch system status
            const systemControlSnap = yield firebase_1.db
                .collection("ControlVariables")
                .where("code", "==", customerCountry)
                .get();
            if (systemControlSnap.empty) {
                throw new functions.https.HttpsError("not-found", (0, messages_1.getMessage)("black_now", "customer_not_found", country));
            }
            const systemControlData = systemControlSnap.docs[0].data();
            const systemUpControl = systemControlData.black_system_control;
            const version = systemControlData.black_version;
            if (systemUpControl !== "0") {
                throw new functions.https.HttpsError("internal", "System Under Maintenance.");
            }
            return { UCN, customerData, customerRef, version };
        }
        catch (error) {
            console.log("----Error: ", error);
            throw new functions.https.HttpsError("unknown", (0, messages_1.getMessage)("system", "under_maintenance", country));
        }
    });
}
