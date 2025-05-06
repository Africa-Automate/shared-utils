import { functions_v2 } from "../v1/firebase";
/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions_v2.https.CallableRequest} request - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions_v2.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
export declare function getSystemStatusV2(request: functions_v2.https.CallableRequest, country: string): Promise<{
    UCN: string;
    customerData: FirebaseFirestore.DocumentData;
    customerRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    version: string;
    uid: string;
    currency: string;
}>;
