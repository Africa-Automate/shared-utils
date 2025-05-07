/**
 * **Save Files to Firebase Storage**
 *
 * This function uploads one or multiple **base64-encoded files** to Firebase Storage
 * and returns their **public URLs**.
 *
 * **Key Operations:**
 * 1. **Validate Input:**
 *    - Ensures `files` is a non-empty array.
 *    - Each file must contain:
 *      - A **Base64 string** (`base64`).
 *      - A **MIME type** (`mimeType`).
 *
 * 2. **Process Each File:**
 *    - Converts `base64` to a **Buffer** for upload.
 *    - Generates a **unique filename** using:
 *      - `name` (prefix)
 *      - **Timestamp**
 *      - **UUID v4** (to avoid duplication)
 *      - **File extension** (extracted from MIME type)
 *    - Constructs a **storage path**:
 *      `"path/name_timestamp_uuid.extension"`
 *
 * 3. **Upload to Firebase Storage:**
 *    - Uses `storage.bucket("informal-traders-africa")`.
 *    - Saves the file with its respective **MIME type**.
 *    - Sets the file to **publicly accessible**.
 *    - Retrieves the **public URL** and adds it to the response list.
 *
 * 4. **Return Uploaded File URLs:**
 *    - An array of **publicly accessible file URLs**.
 *
 * **Firebase Storage Used:**
 * - **Bucket:** `"informal-traders-africa"`
 * - **Path Structure:**
 *   ```txt
 *   Merchant-Documents/Merchant-Images/{merchantNumber}/MerchantImage_1712928000000_uuid.jpg
 *   ```
 *
 * **Expected Parameters:**
 * ```json
 * {
 *   "files": [
 *     { "base64": "<base64_string>", "mimeType": "image/jpeg" },
 *     { "base64": "<base64_string>", "mimeType": "application/pdf" }
 *   ],
 *   "path": "Merchant-Documents/Merchant-Images/USER123",
 *   "name": "MerchantImage"
 * }
 * ```
 *
 * **Response Example:**
 * ```json
 * [
 *   "https://storage.googleapis.com/informal-traders-africa/Merchant-Documents/Merchant-Images/USER123/MerchantImage_1712928000000_uuid.jpg",
 *   "https://storage.googleapis.com/informal-traders-africa/Merchant-Documents/Merchant-Images/USER123/MerchantImage_1712928000001_uuid.pdf"
 * ]
 * ```
 *
 * **Possible Errors:**
 * - `"Invalid input. No files provided."`: If the input array is empty or invalid.
 * - `"Each file must have a base64 string and mime type."`: If file properties are missing.
 * - `"unknown"`: If an unexpected error occurs during the upload process.
 *
 * @param {Array<{ base64: string; mimeType: string }>} files - The files to upload.
 * @param {string} path - The storage directory where files should be saved.
 * @param {string} name - A unique identifier for file naming.
 * * @param {string} bucketName - Optional firebase storage bucket name - defaults to "informal-traders-africa"
 * @returns {Promise<string[]>} An array of public URLs for the uploaded files.
 * @throws {Error} If the input is invalid or an upload error occurs.
 */
export declare function saveFiles(files: {
    base64: string;
    mimeType: string;
}[], path: string, name: string, bucketName?: string): Promise<string[]>;
