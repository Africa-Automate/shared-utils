import { HttpsError } from "./firebase";

export function logAndRethrowError(error: any): never {
  console.error(error);

  if (error instanceof HttpsError) {
    throw new HttpsError(error.code, error.message, error.details);
  }

  throw new HttpsError("unknown", "Unexpected error occurred.");
}
