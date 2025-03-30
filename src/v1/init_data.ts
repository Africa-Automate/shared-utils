import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { db } from "./firebase";

// const nodemailer = require("nodemailer");
export async function initialization(
  data: any,
  context: functions.https.CallableContext
) {
  // check if user is authenticated
  if (!context.auth)
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );

  const agentUid = context.auth.token.uid;
  const agentUserRecord = await admin.auth().getUser(agentUid);
  const agentCustomClaims = agentUserRecord.customClaims;

  if (!agentCustomClaims)
    throw new functions.https.HttpsError(
      "internal",
      "User does not have permissions."
    );

  const agentMemberNumber = agentCustomClaims.member_number;

  const parts = agentMemberNumber.split("-");
  const countryCode = parts[0];
  const associationNumber = countryCode + "-" + parts[1];

  const systemControlSnap = await db
    .collection("ControlVariables")
    .where("code", "==", countryCode)
    .get();

  const systemControlDoc = systemControlSnap
    .docs[0] as admin.firestore.QueryDocumentSnapshot;
  const systemControlData =
    systemControlDoc.data() as admin.firestore.DocumentData;
  const systemUpControl = systemControlData.system_control as string;

  if (systemUpControl != "0")
    throw new functions.https.HttpsError("internal", "System Closed");
  if (!agentCustomClaims.green_agent && !agentCustomClaims.internal_admin)
    throw new functions.https.HttpsError(
      "permission-denied",
      "User does not have the required permissions."
    );
  const activityTypeCodesSnap = await db
    .collection("ActivityTypeCodes")
    .doc("codes")
    .get();
  const activityTypeCodesData =
    activityTypeCodesSnap.data() as admin.firestore.DocumentData;

  return {
    systemControls: systemControlData,
    activityTypeCodes: activityTypeCodesData,
    agentCustomClaims: agentCustomClaims,
    agentUid: agentUid,
    memberNumber: data.memberNumber,
    associationNumber: associationNumber,
    countryCode: countryCode,
  };
}
