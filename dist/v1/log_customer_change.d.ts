interface ChangeLogEntry {
    ucn: string;
    source: string | undefined;
    rawNewData: Record<string, any>;
    originalData: Record<string, any>;
    balance_update?: boolean;
    auth_uid?: string;
    auth_email?: string;
    request_data: Record<string, any>;
    device_info?: Record<string, any>;
    transaction?: FirebaseFirestore.Transaction;
}
export declare function logCustomerChange({ ucn, source, rawNewData, originalData, balance_update, auth_uid, auth_email, request_data, device_info, transaction, }: ChangeLogEntry): Promise<void>;
export {};
