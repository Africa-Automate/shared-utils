"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDocument = saveDocument;
const firebase_1 = require("../src/v1/firebase");
const uuid_1 = require("uuid");
/**
 * Saves a document to Firebase Storage and returns its public URL.
 *
 * @param file - Object containing fileContent (base64 string), fileExtension, fileName, and metadata.
 * @param path - The folder path in Firebase Storage
 * @returns An object with name and link properties
 */
function saveDocument(file, path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file || !file.fileContent || !file.fileExtension || !file.fileName) {
            throw new Error("Invalid input. File information is incomplete.");
        }
        const { fileContent, fileExtension, fileName, metadata } = file;
        try {
            // Convert the base64 string to a buffer
            const fileBuffer = Buffer.from(fileContent, "base64");
            // Define the file name with path and timestamp to avoid overwrites
            const fullFileName = `${path}/${fileName}_${(0, uuid_1.v4)()}_${Date.now()}.${fileExtension}`;
            const fileRef = firebase_1.storage
                .bucket("informal-traders-africa")
                .file(fullFileName);
            // Save the file to Firebase Storage with metadata
            yield fileRef.save(fileBuffer, {
                contentType: `application/${fileExtension}`,
                metadata: metadata,
            });
            // Make the file public
            yield fileRef.makePublic();
            // Return the name and public URL
            return { name: fileName, link: fileRef.publicUrl() };
        }
        catch (error) {
            console.error(error);
            throw new Error(`Failed to save file ${fileName}`);
        }
    });
}
