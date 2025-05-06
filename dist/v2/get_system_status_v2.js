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
exports.getSystemStatusV2 = getSystemStatusV2;
const v1_1 = require("../v1");
const firebase_1 = require("../v1/firebase");
/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions_v2.https.CallableRequest} request - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions_v2.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
function getSystemStatusV2(request, country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestAuth = request.auth;
            if (!requestAuth) {
                throw new firebase_1.functions_v2.https.HttpsError("failed-precondition", "User is not authenticated");
            }
            const userEmail = requestAuth.token.email;
            const UCN = userEmail === null || userEmail === void 0 ? void 0 : userEmail.split("@")[0];
            // Fetch customer data
            const customerRef = firebase_1.db.collection("Customers").doc(UCN);
            const customerSnap = yield customerRef.get();
            if (!customerSnap.exists) {
                throw new firebase_1.functions_v2.https.HttpsError("not-found", (0, v1_1.getMessage)("black_now", "customer_not_found", country));
            }
            const customerData = customerSnap.data();
            if (!customerData) {
                throw new firebase_1.HttpsError("not-found", "Customer data not found.");
            }
            const customerCountry = customerData.member_country;
            // Fetch system status
            const systemControlSnap = yield firebase_1.db
                .collection("ControlVariables")
                .where("code", "==", customerCountry)
                .get();
            if (systemControlSnap.empty) {
                throw new firebase_1.functions_v2.https.HttpsError("not-found", (0, v1_1.getMessage)("black_now", "customer_not_found", country));
            }
            const systemControlData = systemControlSnap.docs[0].data();
            const systemUpControl = systemControlData.black_system_control;
            const version = systemControlData.black_version;
            if (systemUpControl !== "0") {
                throw new firebase_1.functions_v2.https.HttpsError("internal", "System Under Maintenance.");
            }
            const currency = (0, v1_1.getCurrency)(country);
            return {
                UCN,
                customerData,
                customerRef,
                version,
                uid: requestAuth.uid,
                currency,
            };
        }
        catch (error) {
            console.log("----Error: ", error);
            throw new firebase_1.functions_v2.https.HttpsError("unknown", (0, v1_1.getMessage)("system", "under_maintenance", country));
        }
    });
}
