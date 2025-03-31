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
exports.sendNotifications = sendNotifications;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const firebase_1 = require("./firebase");
/**
 * Sends a push notification to a customer's verified devices.
 *
 * @param {string} UCN - The unique customer number.
 * @param {string} title - The title of the notification.
 * @param {string} message - The body of the notification.
 * @returns {Promise<void>} Resolves when notifications are successfully sent.
 * @throws {functions.https.HttpsError} If the customer document is not found.
 */
function sendNotifications(UCN, title, message) {
    return __awaiter(this, void 0, void 0, function* () {
        // Step 1: Retrieve the customer document from Firestore
        const customerRef = firebase_1.db.collection("Customers").doc(UCN);
        const customerDoc = yield customerRef.get();
        if (!customerDoc.exists) {
            throw new functions.https.HttpsError("not-found", "Customer document not found");
        }
        const devices = customerDoc.get("devices") || {};
        for (const key in devices) {
            const deviceInfo = devices[key];
            if (deviceInfo["fcmToken"] == "NO-TOKEN") {
                return;
            }
            if (deviceInfo["verified"]) {
                console.log("Message: " + message);
                try {
                    yield admin.messaging().send({
                        notification: {
                            title: title,
                            body: message,
                        },
                        token: deviceInfo["fcmToken"],
                    });
                }
                catch (e) {
                    return;
                }
            }
        }
    });
}
