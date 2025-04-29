import { auth } from "./firebase";

/**
 * Retrieves a Firebase Auth user's UID and custom claims using their UCN.
 *
 * @param {string} ucn - The user's Unique Customer Number.
 * @returns {Promise<{ uid: string, claims: any }>} - Object with uid and custom claims.
 * @throws Will throw if user is not found or another error occurs.
 */
export async function getUserIdAndClaims(
  ucn: string
): Promise<{ uid: string; claims: any }> {
  const email = `${ucn}@informaltraders.techs`;
  const userRecord = await auth.getUserByEmail(email);
  const uid = userRecord.uid;
  const claims = userRecord.customClaims || {};

  return { uid, claims };
}
