import * as functions from "firebase-functions/v1";
import { db, rtdb } from "./firebase";
import { getCurrency } from "./get_currency";
import { getRandom10DigitNumber } from "./random_10_digits";
import { initialization } from "./init_data";
import { round2SF } from "./round_2sf";
import { getFirstName } from "./get_forst_name";
import { sendSMS } from "./send_sms";

export const sendOTP = functions.https.onCall(async (data, context) => {
  try {
    const initializationData = await initialization(data, context);
    const customerMemberNumber = initializationData.memberNumber;
    const customerCountryCode = initializationData.countryCode;
    const systemControls = initializationData.systemControls;
    const customClaims = initializationData.agentCustomClaims;
    const agentUserID = initializationData.agentUid;
    // const activityTypeCodes = initializationData.activityTypeCodes;

    const otpType = data.otpType;
    const loanAmount = Number(data.loanAmount);
    const requestingAgentMemberNumber = customClaims.member_number;

    const customerRef = db.collection("Customers");
    const customerSnap = await customerRef
      .where("member_number", "==", customerMemberNumber)
      .get();

    if (customerSnap.empty)
      throw new functions.https.HttpsError(
        "internal",
        "Customer not found, Try again."
      );
    const customerData = customerSnap.docs[0].data();
    const customerName = getFirstName(customerData["member_name"]);
    const customerPhoneNumber = customerData["member_cell_number"];
    // const dateAndTime = getDateAndTime();
    const random4DigitNumber = getRandom10DigitNumber(4);
    const currency = getCurrency(customerCountryCode);
    const stockFinanceRate = Number(systemControls["stock_finance_rate"]);
    const adminFee = round2SF(String(loanAmount * stockFinanceRate));
    let message = "";

    if (otpType == "loanApplication") {
      message = `Hi  ${customerName}. Confirm loan request of ${currency}${loanAmount} from ${requestingAgentMemberNumber.substring(3)}. Daily admin fee: ${currency}${adminFee}. OTP: ${random4DigitNumber}`;
      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("LoanPayoutVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    } else if (otpType == "loanWithdrawal") {
      message =
        "Hi " +
        customerName +
        ". Confirm loan request of " +
        currency +
        loanAmount +
        " from " +
        requestingAgentMemberNumber.substring(3) +
        "." +
        " Daily admin fee: " +
        currency +
        adminFee +
        ". Voucher: " +
        random4DigitNumber;

      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("LoanCollectVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    } else if (otpType == "FuelApplication") {
      message =
        "Hi " +
        customerName +
        ". Confirm fuel loan request of " +
        currency +
        loanAmount +
        " from " +
        requestingAgentMemberNumber.substring(4) +
        "." +
        " Admin fee is " +
        currency +
        round2SF(String(loanAmount * 0.05)) +
        ". Voucher: " +
        random4DigitNumber;
      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("FuelRequestVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    } else if (otpType == "transferToMoMo") {
      message =
        "Hi " +
        customerName +
        ". Confirm transfer of " +
        currency +
        loanAmount +
        " to MoMo from " +
        requestingAgentMemberNumber.substring(4) +
        ". Voucher: " +
        random4DigitNumber;
      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("MoMoTransferVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    } else if (otpType == "buyAirtime") {
      message =
        "Hi " +
        customerName +
        ". Confirm buying " +
        currency +
        loanAmount +
        " airtime from " +
        requestingAgentMemberNumber.substring(4) +
        ". Voucher: " +
        random4DigitNumber;
      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("AirtimePurchaseVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    } else if (otpType == "collectFromAgent") {
      message =
        "Hi " +
        customerName +
        ". Confirm transfering collections of " +
        currency +
        loanAmount +
        " to " +
        requestingAgentMemberNumber.substring(4) +
        ". Voucher: " +
        random4DigitNumber;

      await rtdb
        .ref("Green")
        .child("Verifications")
        .child("CollectFromAgentVerification")
        .child(agentUserID + customerMemberNumber)
        .set({ OTP: random4DigitNumber });
    }

    // if (customerCountryCode == "SWZ") {
    //   await db.collection("Requests").doc().set({
    //     phoneNumber: customerPhoneNumber,
    //     requestType: "sms",
    //     timestamp: dateAndTime.timestamp,
    //     country: systemControls["country"],
    //     status: "waiting",
    //     message: message,
    //   });
    // } else {
    //   await rtdb
    //     .ref("Green")
    //     .child("MessegingRequests")
    //     .push({ sendTo: customerPhoneNumber, message: message });
    // }
    console.log(
      "***************",
      systemControls["country"],
      message,
      customerPhoneNumber
    );
    sendSMS(customerCountryCode, message, customerPhoneNumber);

    const response = "Sent";
    return response;
  } catch (error) {
    if (error instanceof functions.https.HttpsError)
      throw new functions.https.HttpsError(error.code, error.message);

    throw new functions.https.HttpsError("unknown", String(error));
  }
});
