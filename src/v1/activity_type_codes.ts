/**
 * Computes the Levenshtein distance between two strings.
 *
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The Levenshtein distance.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
      );
    }
  }
  return dp[m][n];
}

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
export async function findActivityTypeCode(
  activityName: string
): Promise<{ activityName: string; code: string }> {
  // Reference the Firestore document holding the activity type codes.
  const codesDocRef = db.doc("ActivityTypeCodes/codes");
  const codesDocSnap = await codesDocRef.get();

  if (!codesDocSnap.exists) {
    throw new Error("No activity type codes document found in Firestore.");
  }

  const codesData = codesDocSnap.data() as Record<string, string>;
  const searchTerm = activityName.trim().toLowerCase();

  // First, try an exact (case-insensitive) match.
  for (const [name, code] of Object.entries(codesData)) {
    if (name.trim().toLowerCase() === searchTerm) {
      return { activityName: name, code };
    }
  }

  // If no exact match, build a list of potential matches with their Levenshtein distances.
  const matches: { name: string; code: string; distance: number }[] = [];
  for (const [name, code] of Object.entries(codesData)) {
    const lowerName = name.trim().toLowerCase();
    const distance = levenshteinDistance(lowerName, searchTerm);
    matches.push({ name, code, distance });
  }

  // Sort matches by distance (closest first).
  matches.sort((a, b) => a.distance - b.distance);
  const bestMatch = matches[0];

  // Use a threshold: allow minor typos (e.g., a distance of 2 or less, or relative to searchTerm length).
  if (bestMatch.distance <= Math.max(2, searchTerm.length / 2)) {
    // Optionally, avoid ambiguity if the second-best match has the same distance.
    if (matches.length > 1 && matches[1].distance === bestMatch.distance) {
      throw new Error(
        `Ambiguous activity name: multiple close matches found for "${activityName}".`
      );
    }
    return { activityName: bestMatch.name, code: bestMatch.code };
  } else {
    // if no activity type is found, generate a new one and store it
    try {
      const newActivityTypeData =
        await generateAndStoreActivityTypeCode(activityName);
      return newActivityTypeData;
    } catch (error) {
      throw new Error(`No matching activity found for "${activityName}".`);
    }
  }
}

import { db } from "./firebase"; // Import the Firestore instance

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
export async function generateAndStoreActivityTypeCode(
  activityName: string
): Promise<{ activityName: string; code: string }> {
  // Reference to the Firestore document holding all activity type codes.
  const codesDocRef = db.doc("ActivityTypeCodes/codes");

  // Retrieve the current codes mapping.
  const codesDocSnap = await codesDocRef.get();
  const codesData: Record<string, string> = codesDocSnap.exists
    ? (codesDocSnap.data() as Record<string, string>)
    : {};

  // If the activity name is already registered, throw an error.
  if (codesData[activityName]) {
    throw new Error(
      `Activity name "${activityName}" already exists with code "${codesData[activityName]}".`
    );
  }

  const maxAttempts = 10;
  let attempt = 0;
  let newCode: string;

  /**
   * Helper function to generate a random 6-digit code as a string.
   * @returns {string} A 6-digit string with leading zeros if necessary.
   */
  const generateRandom6DigitCode = (): string => {
    const num = Math.floor(Math.random() * 1000000); // Random number from 0 to 999999
    return num.toString().padStart(6, "0"); // Ensure it is always 6 digits
  };

  /**
   * Checks whether the provided code already exists in the current mapping.
   * @param {string} code - The generated code to check.
   * @returns {boolean} True if the code already exists, false otherwise.
   */
  const codeExists = (code: string): boolean =>
    Object.values(codesData).includes(code);

  // Generate a unique code, retrying if necessary.
  do {
    newCode = generateRandom6DigitCode();
    attempt++;
    if (attempt > maxAttempts) {
      throw new Error(
        "Unable to generate a unique activity type code after multiple attempts."
      );
    }
  } while (codeExists(newCode));

  // Store the new activity name and code in Firestore.
  try {
    // Use update so that only the new field is added to the document.
    await codesDocRef.update({
      [activityName]: newCode,
    });
  } catch (error) {
    throw new Error(`Failed to update Firestore: ${error}`);
  }

  return { activityName, code: newCode };
}
