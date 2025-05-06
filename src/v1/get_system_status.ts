import * as functions from "firebase-functions/v1";
import { db } from "../v1/firebase";
import { getMessage } from "../v1/messages";

/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions.https.CallableContext} context - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
export async function getSystemStatus(
  context: functions.https.CallableContext,
  country: string
): Promise<{
  UCN: string;
  customerData: FirebaseFirestore.DocumentData;
  customerRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  version: string;
}> {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "User is not authenticated"
      );
    }
    const userEmail = context.auth.token.email;
    const UCN = userEmail?.split("@")[0] as string;
    // Fetch customer data
    const customerRef = db.collection("Customers");
    const customerSnap = await customerRef
      .where("unique_customer_number", "==", UCN)
      .get();
    if (customerSnap.empty) {
      throw new functions.https.HttpsError(
        "not-found",
        getMessage("black_now", "customer_not_found", country)
      );
    }
    const customerData = customerSnap.docs[0].data();
    const customerCountry = customerData.member_country;

    // Fetch system status
    const systemControlSnap = await db
      .collection("ControlVariables")
      .where("code", "==", customerCountry)
      .get();
    if (systemControlSnap.empty) {
      throw new functions.https.HttpsError(
        "not-found",
        getMessage("black_now", "customer_not_found", country)
      );
    }
    const systemControlData = systemControlSnap.docs[0].data();
    const systemUpControl = systemControlData.black_system_control;
    const version = systemControlData.black_version;
    if (systemUpControl !== "0") {
      throw new functions.https.HttpsError(
        "internal",
        "System Under Maintenance."
      );
    }
    return { UCN, customerData, customerRef, version };
  } catch (error) {
    console.log("----Error: ", error);
    throw new functions.https.HttpsError(
      "unknown",
      getMessage("system", "under_maintenance", country)
    );
  }
}
