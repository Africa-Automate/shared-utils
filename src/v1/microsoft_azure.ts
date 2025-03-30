import { Client } from "@microsoft/microsoft-graph-client";
import axios from "axios";

/**
 * **Microsoft Azure Graph API Client**
 *
 * This module initializes the Microsoft Graph API client for sending emails and other operations.
 *
 * **Key Operations:**
 * 1. **Load Azure Credentials:**
 *    - Uses environment variables:
 *      - `AZURE_TENANT_ID` → Microsoft Azure Tenant ID.
 *      - `AZURE_CLIENT_ID` → Registered Application Client ID.
 *      - `AZURE_CLIENT_SECRET` → Application Client Secret.
 *
 * 2. **Initialize Microsoft Graph API Client:**
 *    - Uses `Client.init()` from the `@microsoft/microsoft-graph-client` package.
 *    - Implements an **authProvider** function that fetches an **OAuth 2.0 access token** dynamically.
 *
 * 3. **Fetch Access Token (`getAccessToken`):**
 *    - Sends a **POST request** to Azure's authentication server.
 *    - Retrieves an `access_token` using **client credentials** authentication.
 *    - Uses **Microsoft Graph API's default scope**: `https://graph.microsoft.com/.default`.
 *
 * 4. **Exporting the Initialized Client:**
 *    - `azureClient` is exported for use in **email sending & other Graph API requests**.
 *
 * **Microsoft Graph API Authentication URL Used:**
 * ```
 * https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token
 * ```
 *
 * **Expected Environment Variables:**
 * ```
 * AZURE_TENANT_ID=<your_tenant_id>
 * AZURE_CLIENT_ID=<your_client_id>
 * AZURE_CLIENT_SECRET=<your_client_secret>
 * ```
 *
 * **Possible Errors:**
 * - `"Failed to obtain access token"`: If authentication fails.
 * - `"Error fetching access token"`: Logs details if access token retrieval fails.
 *
 * **Example Usage:**
 * ```typescript
 * import azureClient from "../utils/microsoft_azure";
 *
 * async function sendTestEmail() {
 *   await azureClient.api("/users/your-email@example.com/sendMail").post({
 *     message: {
 *       subject: "Test Email",
 *       body: { contentType: "Text", content: "Hello from Microsoft Graph API!" },
 *       toRecipients: [{ emailAddress: { address: "recipient@example.com" } }]
 *     },
 *     saveToSentItems: true
 *   });
 * }
 * ```
 *
 * @returns {Promise<Client>} An authenticated Microsoft Graph API client.
 * @throws {Error} If authentication fails or an access token cannot be retrieved.
 */

// ✅ Load Azure Credentials from Environment Variables
const TENANT_ID = process.env.AZURE_TENANT_ID;
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;

// ✅ Initialize Microsoft Graph API Client
const azureClient = Client.init({
  authProvider: async (done) => {
    try {
      const accessToken = await getAccessToken();
      done(null, accessToken);
    } catch (error) {
      done(error, null);
    }
  },
});

// Function to get access token
async function getAccessToken(): Promise<string> {
  try {
    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID || "");
    params.append("client_secret", CLIENT_SECRET || "");
    params.append("scope", "https://graph.microsoft.com/.default");
    params.append("grant_type", "client_credentials");

    const response = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      params
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to obtain access token.");
  }
}
// ✅ Export the client and constants
export default azureClient; // ✅ Now you can do `import client from "../utils/microsoft_azure";`
