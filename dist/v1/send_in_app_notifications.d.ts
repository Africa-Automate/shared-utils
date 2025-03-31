/**
 * Sends a push notification to a customer's verified devices.
 *
 * @param {string} UCN - The unique customer number.
 * @param {string} title - The title of the notification.
 * @param {string} message - The body of the notification.
 * @returns {Promise<void>} Resolves when notifications are successfully sent.
 * @throws {functions.https.HttpsError} If the customer document is not found.
 */
export declare function sendNotifications(UCN: string, title: string, message: string): Promise<void>;
