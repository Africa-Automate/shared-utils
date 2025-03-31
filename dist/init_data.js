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
exports.initialization = initialization;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
const firebase_1 = require("../src/v1/firebase");
// const nodemailer = require("nodemailer");
function initialization(data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if user is authenticated
        if (!context.auth)
            throw new functions.https.HttpsError("unauthenticated", "User is not authenticated");
        const agentUid = context.auth.token.uid;
        const agentUserRecord = yield admin.auth().getUser(agentUid);
        const agentCustomClaims = agentUserRecord.customClaims;
        if (!agentCustomClaims)
            throw new functions.https.HttpsError("internal", "User does not have permissions.");
        const agentMemberNumber = agentCustomClaims.member_number;
        const parts = agentMemberNumber.split("-");
        const countryCode = parts[0];
        const associationNumber = countryCode + "-" + parts[1];
        const systemControlSnap = yield firebase_1.db
            .collection("ControlVariables")
            .where("code", "==", countryCode)
            .get();
        const systemControlDoc = systemControlSnap
            .docs[0];
        const systemControlData = systemControlDoc.data();
        const systemUpControl = systemControlData.system_control;
        if (systemUpControl != "0")
            throw new functions.https.HttpsError("internal", "System Closed");
        if (!agentCustomClaims.green_agent && !agentCustomClaims.internal_admin)
            throw new functions.https.HttpsError("permission-denied", "User does not have the required permissions.");
        const activityTypeCodesSnap = yield firebase_1.db
            .collection("ActivityTypeCodes")
            .doc("codes")
            .get();
        const activityTypeCodesData = activityTypeCodesSnap.data();
        return {
            systemControls: systemControlData,
            activityTypeCodes: activityTypeCodesData,
            agentCustomClaims: agentCustomClaims,
            agentUid: agentUid,
            memberNumber: data.memberNumber,
            associationNumber: associationNumber,
            countryCode: countryCode,
        };
    });
}
