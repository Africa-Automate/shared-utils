import * as admin from "firebase-admin";
export declare function getDateAndTime(): {
    time: string;
    date: string;
    timestamp: number;
    unformatedTimestamp: admin.firestore.Timestamp;
    date_quarter: string;
    date_life: string;
    iso_string_date: string;
};
