import azureClient from "./microsoft_azure";

/**
 * **Send Email via Microsoft Azure**
 *
 * This function sends an **HTML-formatted email** using Microsoft Azure's **Graph API**.
 *
 * **Key Operations:**
 * 1. **Prepare Email Content:**
 *    - Formats the email with:
 *      - **Subject:** `subject`
 *      - **Body:** `content` wrapped in an HTML template.
 *      - **Recipients:** `destinationEmails` mapped as `toRecipients`.
 *
 * 2. **Send Email via Microsoft Graph API:**
 *    - Uses `azureClient` to send the email through Azure.
 *    - The sender's email is `solutions@africaautomate.tech`.
 *    - `saveToSentItems: true` ensures the email appears in the sender’s **Sent Items**.
 *
 * 3. **Logging & Error Handling:**
 *    - Logs **success** or **failure** for debugging.
 *
 * **Microsoft Graph API Endpoint Used:**
 * - `/users/{USER_EMAIL}/sendMail`
 *
 * **Expected Parameters:**
 * ```json
 * {
 *   "subject": "Welcome to Africa Automate",
 *   "content": "Thank you for joining us! 🚀",
 *   "destinationEmails": ["user@example.com", "another@example.com"]
 * }
 * ```
 *
 * **Example Email Format:**
 * ```html
 * <html>
 * <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
 *   <p>Thank you for joining us! 🚀</p>
 *   <p>Best Regards,<br/>Your Support Team 💡</p>
 * </body>
 * </html>
 * ```
 *
 * **Possible Errors:**
 * - `"unknown"`: If an unexpected error occurs while sending the email.
 *
 * @param {string} subject - The subject line of the email.
 * @param {string} content - The HTML-formatted body of the email.
 * @param {string[]} destinationEmails - The recipient email addresses.
 * @returns {Promise<Object | void>} The response from Azure API if successful, otherwise logs an error.
 * @throws {Error} If an issue occurs while sending the email.
 */
export async function sendEmail(
  subject: string,
  content: string,
  destinationEmails: string[]
): Promise<object | void> {
  const USER_EMAIL = "solutions@africaautomate.tech"; // ✅ Sender's Email

  const toRecipients = destinationEmails.map((email) => ({
    emailAddress: { address: email },
  }));
  const email = {
    message: {
      subject: subject,
      body: {
        contentType: "HTML", // Use HTML instead of Text
        content: `
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>${content}</p>
            <p>Best Regards,<br/>Your Support Team 💡</p>
          </body>
          </html>
        `,
      },
      toRecipients: toRecipients, // Use the mapped list of recipients
    },
    saveToSentItems: true,
  };
  try {
    const response = await azureClient
      .api(`/users/${USER_EMAIL}/sendMail`)
      .post(email);
    console.log("✅ Email sent successfully!");
    return response;
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
