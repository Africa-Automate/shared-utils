/**
 * Retrieves a Firebase Auth user's UID and custom claims using their UCN.
 * Returns `{ uid: undefined, claims: {} }` if the user is not found.
 *
 * @param {string} ucn - The user's Unique Customer Number.
 * @returns {Promise<{ uid: string, claims: any }>}
 */
export declare function getUserIdAndClaims(ucn: string): Promise<{
    uid: any;
    claims: any;
}>;
