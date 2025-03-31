export declare const messages: {
    en: {
        accounts: {
            account_created: (name: string, memberNumber: string) => string;
            admin_promotion: (name: string, email: string) => string;
            payment_message: (currency: string, amountPaid: string, accountBalance: string, loanNumber: string) => string;
            payment_made: () => string;
            request_otp: () => string;
            otp_mismatch: () => string;
            id_registered: () => string;
            phone_registered: () => string;
            success: () => string;
        };
        loans: {
            withdrawal_success: (currency: string, actualLoanValue: string, memberNumber: string) => string;
            new_loan: (name: string, currency: string, actualLoanAmount: string, currentDailyAdminFee: string, nextExpectedPayment: string) => string;
            loan_repayment_completed: (name: string, currency: string, amountPaid: string) => string;
            loan_repayment_partial: (name: string, currency: string, amountPaid: string, remainingBalance: string, dailyAdminFee: string, nextPayment: string) => string;
            loan_created: (name: string, currency: string, loanAmount: string) => string;
            loan_exemption: (name: string, reason: string, endDate: string) => string;
            grace_period_end: (name: string, endDate: string) => string;
            missed_payment: (newLoanAmount: string, newAdminFee: string) => string;
            ban_lifted: (name: string) => string;
        };
        wallet: {
            wallet_deposit: (name: string, currency: string, amountDeposited: string, newBalance: string, customerReference: string) => string;
        };
        collections: {
            collection_receipt: (collecteeName: string, agentNumber: string, currency: string, actualCollected: string, collecteeReference: string) => string;
            collection_confirmation: (collectorName: string, currency: string, actualCollected: string, collecteeMemberNumber: string, collecteeReference: string) => string;
        };
        savings: {
            savings_deposit: (name: string, currency: string, amount: string, savingsType: string, newBalance: string, customerReference: string) => string;
            savings_payout: (name: string, currency: string, nettSavings: string) => string;
        };
        black_now: {
            unauthenticated: () => string;
            no_permissions: () => string;
            voucher_not_found: () => string;
            exceeds_voucher_amount: () => string;
            customer_not_found: () => string;
            limit_exceeded: () => string;
            voucher_expired: () => string;
            voucher_not_active: () => string;
            merchant_not_found: () => string;
            merchant_limited: () => string;
            invalid_balance: () => string;
            voucher_must_be_positive: () => string;
            customer_not_eligible: () => string;
            outside_payday_window: () => string;
            flagged_loans_support_required: () => string;
            exceeds_available_limit: (remaining: number, currency: string) => string;
            redeemed_message: (amount: number, merchantName: string, currency: string) => string;
            voucher_cancelled: () => string;
            voucher_redeemed_subject: () => string;
            voucher_redeemed_body: (amount: number, merchantName: string, newMerchantBalance: number, currency: string) => string;
            loan_not_found: (loanNumber: string) => string;
            invalid_amount_repayment: () => string;
            insufficient_funds: () => string;
            loan_settled: (customerName: string, currency: string, amount: string) => string;
            loan_payment_received: (customerName: string, currency: string, amountPaid: string, newBalance: string) => string;
            can_not_proceed: () => string;
            amount_more_than_required: () => string;
            no_active_loans: () => string;
            unknown_error: () => string;
        };
        system: {
            under_maintenance: () => string;
        };
        universal: {
            missing_arguments: () => string;
            unauthenticated: () => string;
            system_update_required: () => string;
            change_password_first: () => string;
            device_not_found: () => string;
            no_contract_found: () => string;
            unknown_error: () => string;
            safety_alert_title: () => string;
            device_logged_in: (device: string) => string;
        };
    };
    pt: {
        accounts: {
            request_otp: () => string;
            otp_mismatch: () => string;
            id_registered: () => string;
            phone_registered: () => string;
            success: () => string;
            account_created: (name: string, memberNumber: string) => string;
            admin_promotion: (name: string, email: string) => string;
            payment_message: (currency: string, amountPaid: string, accountBalance: string, loanNumber: string) => string;
            payment_made: () => string;
        };
        loans: {
            withdrawal_success: (currency: string, actualLoanValue: string, memberNumber: string) => string;
            new_loan: (name: string, currency: string, actualLoanAmount: string, currentDailyAdminFee: string, nextExpectedPayment: string) => string;
            loan_repayment_completed: (name: string, currency: string, amountPaid: string) => string;
            loan_repayment_partial: (name: string, currency: string, amountPaid: string, remainingBalance: string, dailyAdminFee: string, nextPayment: string) => string;
            loan_created: (name: string, currency: string, loanAmount: string) => string;
            loan_exemption: (name: string, reason: string, endDate: string) => string;
            grace_period_end: (name: string, endDate: string) => string;
            missed_payment: (newLoanAmount: string, newAdminFee: string) => string;
            ban_lifted: (name: string) => string;
        };
        wallet: {
            wallet_deposit: (name: string, currency: string, amountDeposited: string, newBalance: string, customerReference: string) => string;
        };
        collections: {
            collection_receipt: (collecteeName: string, agentNumber: string, currency: string, actualCollected: string, collecteeReference: string) => string;
            collection_confirmation: (collectorName: string, currency: string, actualCollected: string, collecteeMemberNumber: string, collecteeReference: string) => string;
        };
        savings: {
            savings_deposit: (name: string, currency: string, amount: string, savingsType: string, newBalance: string, customerReference: string) => string;
            savings_payout: (name: string, currency: string, nettSavings: string) => string;
        };
        black_now: {
            unauthenticated: () => string;
            no_permissions: () => string;
            voucher_not_found: () => string;
            exceeds_voucher_amount: () => string;
            customer_not_found: () => string;
            limit_exceeded: () => string;
            voucher_expired: () => string;
            voucher_not_active: () => string;
            merchant_not_found: () => string;
            merchant_limited: () => string;
            invalid_balance: () => string;
            voucher_cancelled: () => string;
            voucher_must_be_positive: () => string;
            customer_not_eligible: () => string;
            outside_payday_window: () => string;
            flagged_loans_support_required: () => string;
            exceeds_available_limit: (remaining: number, currency: string) => string;
            redeemed_message: (amount: number, merchantName: string, currency: string) => string;
            voucher_redeemed_subject: () => string;
            voucher_redeemed_body: (amount: number, merchantName: string, newMerchantBalance: number, currency: string) => string;
            loan_not_found: (loanNumber: string) => string;
            invalid_amount_repayment: () => string;
            insufficient_funds: () => string;
            can_not_proceed: () => string;
            amount_more_than_required: () => string;
            loan_settled: (customerName: string, currency: string, amount: string) => string;
            loan_payment_received: (customerName: string, currency: string, amountPaid: string, newBalance: string) => string;
            no_active_loans: () => string;
            unknown_error: () => string;
        };
        system: {
            under_maintenance: () => string;
        };
        universal: {
            missing_arguments: () => string;
            unauthenticated: () => string;
            system_update_required: () => string;
            change_password_first: () => string;
            device_not_found: () => string;
            no_contract_found: () => string;
            unknown_error: () => string;
            safety_alert_title: () => string;
            device_logged_in: (device: string) => string;
        };
    };
};
export declare function getMessage<C extends keyof (typeof messages)["en"], // Ensures "loans" or "savings"
K extends keyof (typeof messages)["en"][C]>(category: C, key: K, customerCountryCode: string, ...params: Parameters<Extract<(typeof messages)["en"][C][K], (...args: any[]) => string>>): string;
