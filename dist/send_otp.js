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
exports.sendOTP = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const firebase_1 = require("../src/v1/firebase");
const get_currency_1 = require("../src/v1/get_currency");
const random_10_digits_1 = require("../src/v1/random_10_digits");
const init_data_1 = require("../src/v1/init_data");
const round_2sf_1 = require("../src/v1/round_2sf");
const get_forst_name_1 = require("../src/v1/get_forst_name");
const send_sms_1 = require("../src/v1/send_sms");
exports.sendOTP = functions.https.onCall((data, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const initializationData = yield (0, init_data_1.initialization)(data, context);
        const customerMemberNumber = initializationData.memberNumber;
        const customerCountryCode = initializationData.countryCode;
        const systemControls = initializationData.systemControls;
        const customClaims = initializationData.agentCustomClaims;
        const agentUserID = initializationData.agentUid;
        // const activityTypeCodes = initializationData.activityTypeCodes;
        const otpType = data.otpType;
        const loanAmount = Number(data.loanAmount);
        const requestingAgentMemberNumber = customClaims.member_number;
        const customerRef = firebase_1.db.collection("Customers");
        const customerSnap = yield customerRef
            .where("member_number", "==", customerMemberNumber)
            .get();
        if (customerSnap.empty)
            throw new functions.https.HttpsError("internal", "Customer not found, Try again.");
        const customerData = customerSnap.docs[0].data();
        const customerName = (0, get_forst_name_1.getFirstName)(customerData["member_name"]);
        const customerPhoneNumber = customerData["member_cell_number"];
        // const dateAndTime = getDateAndTime();
        const random4DigitNumber = (0, random_10_digits_1.getRandom10DigitNumber)(4);
        const currency = (0, get_currency_1.getCurrency)(customerCountryCode);
        const stockFinanceRate = Number(systemControls["stock_finance_rate"]);
        const adminFee = (0, round_2sf_1.round2SF)(String(loanAmount * stockFinanceRate));
        let message = "";
        if (otpType == "loanApplication") {
            message = `Hi  ${customerName}. Confirm loan request of ${currency}${loanAmount} from ${requestingAgentMemberNumber.substring(3)}. Daily admin fee: ${currency}${adminFee}. OTP: ${random4DigitNumber}`;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("LoanPayoutVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        else if (otpType == "loanWithdrawal") {
            message =
                "Hi " +
                    customerName +
                    ". Confirm loan request of " +
                    currency +
                    loanAmount +
                    " from " +
                    requestingAgentMemberNumber.substring(3) +
                    "." +
                    " Daily admin fee: " +
                    currency +
                    adminFee +
                    ". Voucher: " +
                    random4DigitNumber;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("LoanCollectVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        else if (otpType == "FuelApplication") {
            message =
                "Hi " +
                    customerName +
                    ". Confirm fuel loan request of " +
                    currency +
                    loanAmount +
                    " from " +
                    requestingAgentMemberNumber.substring(4) +
                    "." +
                    " Admin fee is " +
                    currency +
                    (0, round_2sf_1.round2SF)(String(loanAmount * 0.05)) +
                    ". Voucher: " +
                    random4DigitNumber;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("FuelRequestVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        else if (otpType == "transferToMoMo") {
            message =
                "Hi " +
                    customerName +
                    ". Confirm transfer of " +
                    currency +
                    loanAmount +
                    " to MoMo from " +
                    requestingAgentMemberNumber.substring(4) +
                    ". Voucher: " +
                    random4DigitNumber;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("MoMoTransferVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        else if (otpType == "buyAirtime") {
            message =
                "Hi " +
                    customerName +
                    ". Confirm buying " +
                    currency +
                    loanAmount +
                    " airtime from " +
                    requestingAgentMemberNumber.substring(4) +
                    ". Voucher: " +
                    random4DigitNumber;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("AirtimePurchaseVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        else if (otpType == "collectFromAgent") {
            message =
                "Hi " +
                    customerName +
                    ". Confirm transfering collections of " +
                    currency +
                    loanAmount +
                    " to " +
                    requestingAgentMemberNumber.substring(4) +
                    ". Voucher: " +
                    random4DigitNumber;
            yield firebase_1.rtdb
                .ref("Green")
                .child("Verifications")
                .child("CollectFromAgentVerification")
                .child(agentUserID + customerMemberNumber)
                .set({ OTP: random4DigitNumber });
        }
        // if (customerCountryCode == "SWZ") {
        //   await db.collection("Requests").doc().set({
        //     phoneNumber: customerPhoneNumber,
        //     requestType: "sms",
        //     timestamp: dateAndTime.timestamp,
        //     country: systemControls["country"],
        //     status: "waiting",
        //     message: message,
        //   });
        // } else {
        //   await rtdb
        //     .ref("Green")
        //     .child("MessegingRequests")
        //     .push({ sendTo: customerPhoneNumber, message: message });
        // }
        console.log("***************", systemControls["country"], message, customerPhoneNumber);
        (0, send_sms_1.sendSMS)(customerCountryCode, message, customerPhoneNumber);
        const response = "Sent";
        return response;
    }
    catch (error) {
        if (error instanceof functions.https.HttpsError)
            throw new functions.https.HttpsError(error.code, error.message);
        throw new functions.https.HttpsError("unknown", String(error));
    }
}));
