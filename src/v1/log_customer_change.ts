import { getDateAndTime } from "./get_date_and_time";
import { db } from "./firebase";
import { sendEmail } from "./send_email";

interface ChangeLogEntry {
  ucn: string;
  source: string | undefined;
  rawNewData: Record<string, any>;
  originalData: Record<string, any>;
  balance_update?: boolean;
  auth_uid?: string;
  auth_email?: string;
  request_data: Record<string, any>;
  device_info?: Record<string, any>;
  transaction?: FirebaseFirestore.Transaction;
}

export async function logCustomerChange({
  ucn,
  source,
  rawNewData,
  originalData,
  balance_update,
  auth_uid,
  auth_email,
  request_data,
  device_info,
  transaction,
}: ChangeLogEntry): Promise<void> {
  try {
    if (!ucn || !rawNewData || !originalData) {
      console.warn("⚠️ logCustomerChange: Missing required fields.");
      return;
    }

    // 🔁 Generate field-level diffs
    const changes: Record<string, { old: any; new: any }> = {};
    const allKeys = new Set([
      ...Object.keys(originalData),
      ...Object.keys(rawNewData),
    ]);

    for (const key of allKeys) {
      const oldVal = originalData[key] ?? null;
      const newVal = rawNewData[key] ?? null;
      if (oldVal !== newVal) {
        changes[key] = { old: oldVal, new: newVal };
      }
    }

    if (Object.keys(changes).length === 0) {
      console.log(`🟡 No meaningful changes to log for ${ucn}`);
      return;
    }

    const now = getDateAndTime();
    const fieldNames = Object.keys(changes);
    const balanceFields = [
      "account_balance",
      "savings_balance",
      "monthly_balance",
    ];
    const computedBalanceUpdate = fieldNames.some((field) =>
      balanceFields.includes(field)
    );

    // 🧾 Final log entry
    const logEntry: Record<string, any> = {
      ucn,
      changes,
      triggered_by: source,
      date: now.date,
      date_iso: now.iso_string_date,
      timestamp: now.timestamp,
      field_names: fieldNames,
      request_data: request_data,
      field_count: fieldNames.length,
      balance_update: balance_update ?? computedBalanceUpdate,
    };

    if (auth_uid) logEntry.auth_uid = auth_uid;
    if (auth_email) logEntry.auth_email = auth_email;
    if (device_info) logEntry.device_info = device_info;

    const logRef = db.collection("CustomerChangeLogs").doc();
    if (transaction) {
      transaction.set(logRef, logEntry);
    } else {
      await logRef.set(logEntry);
    }
  } catch (error) {
    const now = getDateAndTime();
    const errorLog: Record<string, any> = {
      ucn,
      error: String(error),
      triggered_by: source,
      date: now.date,
      date_iso: now.iso_string_date,
      timestamp: now.timestamp,
    };

    if (auth_uid) errorLog.auth_uid = auth_uid;
    if (auth_email) errorLog.auth_email = auth_email;
    if (device_info) errorLog.device_info = device_info;

    await db.collection("CustomerChangeLogsErrors").add(errorLog);

    await sendEmail(
      "Customer Change Log Failed",
      `${String(error)}.<br/> UCN: ${ucn}`,
      [
        "sithembiso.dlamini@africaautomate.tech",
        "lindani.dlamini@africaautomate.tech",
      ]
    );
  }
}
