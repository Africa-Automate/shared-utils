/**
 * Sends an SMS message based on the recipient's country code.
 *
 * @param {string} countryCode - The country code of the recipient (e.g., "SA", "MZ", or other).
 * @param {string} message - The message content to be sent.
 * @param {string} cellNumber - The recipient's phone number.
 * @returns {Promise<void>} Resolves when the SMS request is successfully pushed to the database.
 * @throws {Error} If there are any issues with pushing the request to the database.
 */
export declare function sendSMS(countryCode: string, message: string, cellNumber: string): Promise<void>;
