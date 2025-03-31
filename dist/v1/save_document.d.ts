/**
 * Saves a document to Firebase Storage and returns its public URL.
 *
 * @param file - Object containing fileContent (base64 string), fileExtension, fileName, and metadata.
 * @param path - The folder path in Firebase Storage
 * @returns An object with name and link properties
 */
export declare function saveDocument(file: {
    fileContent: string;
    fileExtension: string;
    fileName: string;
    metadata: object;
}, path: string): Promise<{
    name: string;
    link: string;
}>;
