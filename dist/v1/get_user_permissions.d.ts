import * as functions from "firebase-functions/v1";
/**
 * Checks if the authenticated user has the required permission.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @param {string} permission - The specific permission required to access the resource.
 * @throws {functions.https.HttpsError} If the user is not authenticated or does not have the required permission.
 * @returns {Promise<void>} Resolves if the user has the required permission; otherwise, an error is thrown.
 */
export declare function getUserPermission(context: functions.https.CallableContext, permission: string): Promise<void>;
