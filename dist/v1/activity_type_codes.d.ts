/**
 * Finds and returns the activity type code for a given activity name from Firestore.
 *
 * @description
 * This function retrieves the mapping of activity names to their 6-digit codes from the
 * `/ActivityTypeCodes/codes` Firestore document. It first attempts an exact (case-insensitive)
 * match for the provided activity name. If no exact match is found, it calculates the Levenshtein
 * distance between the search term and each activity name in Firestore. If the closest match is within
 * an acceptable threshold (and unambiguous), the function returns that match. Otherwise, it throws an error.
 *
 * @param {string} activityName - The activity name to search for.
 * @returns {Promise<{ activityName: string; code: string }>} A promise that resolves with the matched activity name and its code.
 *
 * @throws {Error} If no matching activity is found or if the match is ambiguous.
 */
export declare function findActivityTypeCode(activityName: string): Promise<{
    activityName: string;
    code: string;
}>;
/**
 * Generates and stores a unique 6-digit activity type code in Firestore.
 *
 * @description
 * This function checks whether the given activity name already exists in the
 * `/ActivityTypeCodes/codes` Firestore document. If it doesn't, it generates a
 * unique 6-digit numeric code (as a string), ensuring the code is not already
 * used for another activity. The new activity and its code are then stored in
 * Firestore. If a unique code cannot be found within a set number of attempts,
 * the function throws an error.
 *
 * @param {string} activityName - The name of the new activity to register.
 * @returns {Promise<{ activityName: string; code: string }>} A promise that resolves with the activity name and its unique code.
 *
 * @throws {Error} If the activity name already exists, or if a unique code cannot be generated.
 */
export declare function generateAndStoreActivityTypeCode(activityName: string): Promise<{
    activityName: string;
    code: string;
}>;
