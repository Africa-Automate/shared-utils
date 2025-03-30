import * as functions from "firebase-functions/v1";
import { db } from "./firebase";

/**
 * Checks if the authenticated user has the required permission.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @param {string} permission - The specific permission required to access the resource.
 * @throws {functions.https.HttpsError} If the user is not authenticated or does not have the required permission.
 * @returns {Promise<void>} Resolves if the user has the required permission; otherwise, an error is thrown.
 */
export async function getUserPermission(
  context: functions.https.CallableContext,
  permission: string // Now permission is dynamic
) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );
  }
  const userEmail = context.auth.token.email;
  const UCN = userEmail?.split("@")[0] ?? "";
  const userSnap = await db.collection("Customers").doc(UCN).get();
  if (!userSnap.exists) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Permissions denied."
    );
  }
  const userData = userSnap.data();
  const userPermissions = userData?.permissions || {};
  // Check if user has the requested permission
  if (!userPermissions[permission]) {
    throw new functions.https.HttpsError(
      "permission-denied",
      `Permissions denied - user does not have privileges.`
    );
  }
}
