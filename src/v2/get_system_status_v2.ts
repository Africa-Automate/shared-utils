import { getCurrency, getMessage } from "../v1";
import { db, functions_v2, HttpsError } from "../v1/firebase";

/**
 * Checks the system status for a given customer's country.
 *
 * @param {functions_v2.https.CallableRequest} request - The authentication context from Firebase.
 * @returns {Promise<{ UCN: string, customerData: any }>} Resolves with the customer's unique number,  data and the ref to customers.
 * @throws {functions_v2.https.HttpsError} If the user is not authenticated or the system is under maintenance or user is not found.
 */
export async function getSystemStatusV2(
  request: functions_v2.https.CallableRequest,
  country: string
): Promise<{
  UCN: string;
  customerData: FirebaseFirestore.DocumentData;
  customerRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  version: string;
  uid: string;
  currency: string;
}> {
  try {
    const requestAuth = request.auth;
    if (!requestAuth) {
      throw new functions_v2.https.HttpsError(
        "failed-precondition",
        "User is not authenticated"
      );
    }

    const userEmail = requestAuth.token.email;
    const UCN = userEmail?.split("@")[0] as string;
    // Fetch customer data
    const customerRef = db.collection("Customers").doc(UCN);
    const customerSnap = await customerRef.get();
    if (!customerSnap.exists) {
      throw new functions_v2.https.HttpsError(
        "not-found",
        getMessage("black_now", "customer_not_found", country)
      );
    }
    const customerData = customerSnap.data();
    if (!customerData) {
      throw new HttpsError("not-found", "Customer data not found.");
    }

    const customerCountry = customerData.member_country;

    // Fetch system status
    const systemControlSnap = await db
      .collection("ControlVariables")
      .where("code", "==", customerCountry)
      .get();
    if (systemControlSnap.empty) {
      throw new functions_v2.https.HttpsError(
        "not-found",
        getMessage("black_now", "customer_not_found", country)
      );
    }
    const systemControlData = systemControlSnap.docs[0].data();
    const systemUpControl = systemControlData.black_system_control;
    const version = systemControlData.black_version;
    if (systemUpControl !== "0") {
      throw new functions_v2.https.HttpsError(
        "internal",
        "System Under Maintenance."
      );
    }

    const currency = getCurrency(country);

    return {
      UCN,
      customerData,
      customerRef,
      version,
      uid: requestAuth.uid,
      currency,
    };
  } catch (error) {
    console.log("----Error: ", error);
    throw new functions_v2.https.HttpsError(
      "unknown",
      getMessage("system", "under_maintenance", country)
    );
  }
}
