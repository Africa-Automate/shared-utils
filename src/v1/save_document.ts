import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

/**
 * Saves a document to Firebase Storage and returns its public URL.
 *
 * @param file - Object containing fileContent (base64 string), fileExtension, fileName, and metadata.
 * @param path - The folder path in Firebase Storage
 * @returns An object with name and link properties
 */
export async function saveDocument(
  file: {
    fileContent: string;
    fileExtension: string;
    fileName: string;
    metadata: object;
  },
  path: string
): Promise<{ name: string; link: string }> {
  if (!file || !file.fileContent || !file.fileExtension || !file.fileName) {
    throw new Error("Invalid input. File information is incomplete.");
  }

  const { fileContent, fileExtension, fileName, metadata } = file;
  try {
    // Convert the base64 string to a buffer
    const fileBuffer = Buffer.from(fileContent, "base64");
    // Define the file name with path and timestamp to avoid overwrites
    const fullFileName = `${path}/${fileName}_${uuidv4()}_${Date.now()}.${fileExtension}`;
    const fileRef = storage
      .bucket("informal-traders-africa")
      .file(fullFileName);
    // Save the file to Firebase Storage with metadata
    await fileRef.save(fileBuffer, {
      contentType: `application/${fileExtension}`,
      metadata: metadata,
    });
    // Make the file public
    await fileRef.makePublic();
    // Return the name and public URL
    return { name: fileName, link: fileRef.publicUrl() };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to save file ${fileName}`);
  }
}
