import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as functions_v2 from "firebase-functions/v2";
import type { firestore } from "firebase-admin";
// ✅ Ensure Firebase is initialized only once
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// ✅ Export common Firebase services
export const db = admin.firestore();
export const auth = admin.auth();
export const rtdb = admin.database();
export const storage = admin.storage();
export const messaging = admin.messaging();
// ✅ Export common Firebase services
const onCall = functions_v2.https.onCall;
const HttpsError = functions_v2.https.HttpsError;
export { functions, functions_v2, onCall, HttpsError, firestore };
