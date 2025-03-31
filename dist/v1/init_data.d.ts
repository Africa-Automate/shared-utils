import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
export declare function initialization(data: any, context: functions.https.CallableContext): Promise<{
    systemControls: admin.firestore.DocumentData;
    activityTypeCodes: admin.firestore.DocumentData;
    agentCustomClaims: {
        [key: string]: any;
    };
    agentUid: string;
    memberNumber: any;
    associationNumber: string;
    countryCode: any;
}>;
