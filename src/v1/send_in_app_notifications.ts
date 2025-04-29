import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "./firebase";
import { getDateAndTime } from "./get_date_and_time";

/**
 * Sends a push notification to a customer's verified devices.
 *
 * @param {string} UCN - The unique customer number.
 * @param {string} title - The title of the notification.
 * @param {string} message - The body of the notification.
 * @returns {Promise<void>} Resolves when notifications are successfully sent.
 * @throws {functions.https.HttpsError} If the customer document is not found.
 */
export async function sendNotifications(
  UCN: string,
  title: string,
  message: string,
  uid?: string
): Promise<void> {
  // Step 1: Retrieve the customer document from Firestore
  const customerRef = db.collection("Customers").doc(UCN);
  const customerDoc = await customerRef.get();

  if (!customerDoc.exists) {
    throw new functions.https.HttpsError(
      "not-found",
      "Customer document not found"
    );
  }

  const devices = customerDoc.get("devices") || {};
  for (const key in devices) {
    const deviceInfo = devices[key];
    if (deviceInfo["fcmToken"] == "NO-TOKEN") {
      return;
    }

    if (deviceInfo["verified"]) {
      console.log("Message: " + message);
      try {
        await admin.messaging().send({
          notification: {
            title: title,
            body: message,
          },
          token: deviceInfo["fcmToken"],
        });

        if (uid) {
          const now = getDateAndTime();
          const messageData = {
            date: now.date,
            time: now.time,
            timestamp: now.timestamp,
            message: message,
            message_owner: uid,
            source_customer: UCN,
          };

          await db.collection("InAppMessages").doc().set(messageData);
        }
      } catch (e) {
        return;
      }
    }
  }
}
