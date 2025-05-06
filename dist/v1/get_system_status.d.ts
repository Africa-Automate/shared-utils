import * as functions from "firebase-functions/v1";
/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
export declare function getSystemStatus(context: functions.https.CallableContext, country: string): Promise<{
    UCN: string;
    customerData: FirebaseFirestore.DocumentData;
    customerRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    version: string;
}>;
