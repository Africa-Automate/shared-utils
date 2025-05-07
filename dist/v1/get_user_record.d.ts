/**
 * Retrieves a Firebase Auth user's UID and custom claims using their UCN.
 * Returns `null` if the user is not found.
 *
 * @param {string} ucn - The user's Unique Customer Number.
 * @returns {Promise<{ uid: string, claims: any } | null>}
 */
export declare function getUserIdAndClaims(ucn: string): Promise<{
    uid: any;
    claims: any;
} | null>;
