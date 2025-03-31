/**
 * Sends an email through Microsoft Graph API using the configured Azure client.
 *
 * This function constructs a rich HTML email with optional file attachments and delivers it
 * to a list of recipients. It supports any MIME type for attachments (e.g. PDF, CSV, DOCX),
 * and the attachments must be base64-encoded prior to being passed in.
 *
 * ---
 * ### 📥 Parameters
 *
 * @param {string} subject - The subject line of the email. This appears in the recipient’s inbox.
 *
 * @param {string} content - The HTML-safe body content of the email. This will be wrapped
 *        in a standard `<html><body>` layout for consistency and branding.
 *
 * @param {string[]} destinationEmails - An array of valid email addresses to whom the email
 *        should be sent. Each recipient will be added as a `To` recipient.
 *
 * @param {Array<{
 *   name: string;
 *   contentBytes: string;
 *   contentType: string;
 * }>} [attachments] - Optional array of file attachments.
 *
 * - `name`: The file name as it will appear in the email client (e.g. `report.csv`).
 * - `contentBytes`: The base64-encoded string representing the file content.
 *   ⚠️ This must be pre-encoded by the caller — no encoding is performed in the function.
 * - `contentType`: The MIME type (e.g. `text/csv`, `application/pdf`, `image/png`).
 *
 * ---
 * ### 📤 Return Value
 *
 * @returns {Promise<object | void>}
 * - If the email is sent successfully, the function resolves with the Graph API response.
 * - If the request fails (e.g., invalid token, network error), it logs the error and returns `void`.
 *
 * ---
 * ### 🧪 Example Usage
 *
 * ```ts
 * import { sendEmail } from "./send_email";
 * import { encode } from "base-64";
 *
 * const csvData = "Name,Amount\nJohn,100\nJane,200";
 * const base64CSV = encode(csvData);
 *
 * await sendEmail(
 *   "Your Monthly Report",
 *   "Hi team, please find the report attached.",
 *   ["finance@company.com"],
 *   [
 *     {
 *       name: "report.csv",
 *       contentBytes: base64CSV,
 *       contentType: "text/csv",
 *     }
 *   ]
 * );
 * ```
 *
 * ---
 * ### 🔒 Notes
 * - Uses the Microsoft Graph API endpoint `/users/{USER_EMAIL}/sendMail`.
 * - Assumes the `azureClient` is already authenticated via client credentials or delegated token.
 * - The `USER_EMAIL` must be licensed in Microsoft 365 to send emails via Graph.
 * - Attachments should not exceed 3 MB total due to Graph API limits.
 * - If `attachments` is omitted or empty, the email is sent without any files.
 *
 * ---
 * ### 🧯 Error Handling
 * - All API errors are logged to the console with the label `❌ Error sending email:`.
 * - The function does **not** throw — it gracefully fails and returns `void`.
 * - Caller must monitor logs or wrap with try/catch if response assurance is critical.
 */
export declare function sendEmail(subject: string, content: string, destinationEmails: string[], attachments?: {
    name: string;
    contentBytes: string;
    contentType: string;
}[]): Promise<object | void>;
