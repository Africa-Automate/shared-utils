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
exports.getUserPermission = getUserPermission;
const functions = __importStar(require("firebase-functions/v1"));
const firebase_1 = require("../src/v1/firebase");
/**
 * Checks if the authenticated user has the required permission.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @param {string} permission - The specific permission required to access the resource.
 * @throws {functions.https.HttpsError} If the user is not authenticated or does not have the required permission.
 * @returns {Promise<void>} Resolves if the user has the required permission; otherwise, an error is thrown.
 */
function getUserPermission(context, permission // Now permission is dynamic
) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!context.auth) {
            throw new functions.https.HttpsError("unauthenticated", "User is not authenticated");
        }
        const userEmail = context.auth.token.email;
        const UCN = (_a = userEmail === null || userEmail === void 0 ? void 0 : userEmail.split("@")[0]) !== null && _a !== void 0 ? _a : "";
        const userSnap = yield firebase_1.db.collection("Customers").doc(UCN).get();
        if (!userSnap.exists) {
            throw new functions.https.HttpsError("permission-denied", "Permissions denied.");
        }
        const userData = userSnap.data();
        const userPermissions = (userData === null || userData === void 0 ? void 0 : userData.permissions) || {};
        // Check if user has the requested permission
        if (!userPermissions[permission]) {
            throw new functions.https.HttpsError("permission-denied", `Permissions denied - user does not have privileges.`);
        }
    });
}
