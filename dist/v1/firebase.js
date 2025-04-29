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
exports.HttpsError = exports.onCall = exports.functions_v2 = exports.functions = exports.messaging = exports.storage = exports.rtdb = exports.auth = exports.db = void 0;
const admin = __importStar(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
exports.functions = functions;
const functions_v2 = __importStar(require("firebase-functions/v2"));
exports.functions_v2 = functions_v2;
// ✅ Ensure Firebase is initialized only once
if (admin.apps.length === 0) {
    admin.initializeApp();
}
// ✅ Export common Firebase services
exports.db = admin.firestore();
exports.auth = admin.auth();
exports.rtdb = admin.database();
exports.storage = admin.storage();
exports.messaging = admin.messaging();
// ✅ Export common Firebase services
const onCall = functions_v2.https.onCall;
exports.onCall = onCall;
const HttpsError = functions_v2.https.HttpsError;
exports.HttpsError = HttpsError;
