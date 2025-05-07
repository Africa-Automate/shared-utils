import { auth } from "./firebase";

/**
 * Retrieves a Firebase Auth user's UID and custom claims using their UCN.
 * Returns `null` if the user is not found.
 *
 * @param {string} ucn - The user's Unique Customer Number.
 * @returns {Promise<{ uid: string, claims: any } | null>}
 */
export async function getUserIdAndClaims(
  ucn: string
): Promise<{ uid: any; claims: any } | null> {
  const email = `${ucn}@informaltraders.tech`;

  try {
    const userRecord = await auth.getUserByEmail(email);
    return {
      uid: userRecord.uid,
      claims: userRecord.customClaims || {},
    };
  } catch (err: any) {
    if (err.code === "auth/user-not-found") {
      console.warn(`⚠️ No Firebase user found for UCN: ${ucn}`);
    } else {
      console.error(`❌ Unexpected error fetching user for UCN ${ucn}:`, err);
      throw err;
    }
    return { uid: undefined, claims: {} };
  }
}
