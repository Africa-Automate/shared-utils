import * as admin from "firebase-admin";

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
