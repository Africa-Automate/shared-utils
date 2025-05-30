import * as functions from "firebase-functions";
import * as functions_v2 from "firebase-functions/v2";
import type { firestore } from "firebase-admin";
export declare const db: firestore.Firestore;
export declare const auth: import("firebase-admin/auth").Auth;
export declare const rtdb: import("firebase-admin/database").Database;
export declare const storage: import("firebase-admin/storage").Storage;
export declare const messaging: import("firebase-admin/messaging").Messaging;
declare const onCall: typeof functions.https.onCall;
declare const HttpsError: typeof functions.https.HttpsError;
export { functions, functions_v2, onCall, HttpsError, firestore };
