"use strict";
// #######################################################
// ## messages in different languages   ##
// #######################################################
// The messages are in English and Portuguese, but you can add more languages if needed.
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
exports.getMessage = getMessage;
const round_2sf_1 = require("../src/v1/round_2sf");
const to_proper_case_1 = require("../src/v1/to_proper_case");
exports.messages = {
    en: {
        accounts: {
            account_created: (name, memberNumber) => `Hi ${name}, your Informal Traders account has been created successfully. Customer ID: ${memberNumber}.`,
            admin_promotion: (name, email) => `Dear ${name}, you are now an Informal Traders area administrator. Email: ${email}. The office will contact you regarding your password.`,
            payment_message: (currency, amountPaid, accountBalance, loanNumber) => `${currency} ${amountPaid} paid from your account. Remaining balance is ${currency} ${accountBalance}. Ref: Loan repayment - ${loanNumber}.`,
            payment_made: () => "Payment Made",
            request_otp: () => "Request OTP first",
            otp_mismatch: () => "Entered OTP did not match.",
            id_registered: () => "ID is already registered in the system - proceed to login.",
            phone_registered: () => "Cell number is already registered in the system - proceed to login.",
            success: () => "Successfully approved Black Customer",
        },
        loans: {
            withdrawal_success: (currency, actualLoanValue, memberNumber) => `You have successfully withdrawn ${currency}${actualLoanValue} from ${memberNumber}.`,
            new_loan: (name, currency, actualLoanAmount, currentDailyAdminFee, nextExpectedPayment) => `Hi ${name}, loan of ${currency}${actualLoanAmount} approved. Daily admin fee: ${currency}${(0, round_2sf_1.round2SF)(currentDailyAdminFee)}. Next payment is ${currency}${(0, round_2sf_1.round2SF)(nextExpectedPayment)}.`,
            loan_repayment_completed: (name, currency, amountPaid) => `Hi ${name}, payment of ${currency}${amountPaid} received. Your loan is fully settled.`,
            loan_repayment_partial: (name, currency, amountPaid, remainingBalance, dailyAdminFee, nextPayment) => `Hi ${name}, payment of ${currency}${amountPaid} received. Your balance is ${currency}${remainingBalance} with a daily admin fee of ${currency}${dailyAdminFee}. Your next payment is ${currency}${nextPayment}.`,
            loan_created: (name, currency, loanAmount) => `Hi ${name}, your loan of ${currency}${loanAmount} has been successfully created. Remember to make your payments on time to build a good credit history.`,
            loan_exemption: (name, reason, endDate) => `Dear ${name}, your Informal Traders Loan has been exempted from payments for the following reason: ${reason}. Your grace period ends on ${endDate}.`,
            grace_period_end: (name, endDate) => `Dear ${name}, your grace period ends today, ${endDate}. You need to start paying your loan tomorrow.`,
            missed_payment: (newLoanAmount, newAdminFee) => `You have missed a payment, and today's admin fee will be added to the amount owed. New loan amount is ${newLoanAmount}, admin fee is ${newAdminFee}.`,
            ban_lifted: (name) => `Dear ${name}, your ban with informal traders has been lifted. You can now get a loan to finance your stock.`,
        },
        wallet: {
            wallet_deposit: (name, currency, amountDeposited, newBalance, customerReference) => `Hi ${name}, you deposited ${currency}${amountDeposited} into your wallet. New balance: ${currency}${newBalance}. Ref: ${customerReference}.`,
        },
        collections: {
            collection_receipt: (collecteeName, agentNumber, currency, actualCollected, collecteeReference) => `Hi ${collecteeName}, agent ${agentNumber} collected ${currency}${actualCollected} from you. Ref: ${collecteeReference}.`,
            collection_confirmation: (collectorName, currency, actualCollected, collecteeMemberNumber, collecteeReference) => `Hi ${collectorName}, you have collected ${currency}${actualCollected} from ${collecteeMemberNumber}. Ref: ${collecteeReference}.`,
        },
        savings: {
            savings_deposit: (name, currency, amount, savingsType, newBalance, customerReference) => `Hi ${name}, ${currency}${amount} deposited into your ${savingsType} savings. New balance: ${currency}${newBalance}. Ref: ${customerReference}.`,
            savings_payout: (name, currency, nettSavings) => `Hi ${name}, you will be paid ${currency}${nettSavings} for your savings this month. Transfer charge was ${currency}20.00.`,
        },
        // black_now: {
        //   unauthenticated: () => "Request not authenticated. Please log in.",
        //   no_permissions: () => "User does not have permissions.",
        //   voucher_not_found: () => "Voucher not found.",
        //   exceeds_voucher_amount: () =>
        //     "You can only redeem less or equal to the voucher amount.",
        //   customer_not_found: () => "Customer not found.",
        //   limit_exceeded: () =>
        //     "Something went wrong. Amount can't be above set limit and your Now acc must be valid!",
        //   voucher_expired: () => "Voucher has expired.",
        //   voucher_not_active: () => "Voucher is not active.",
        //   merchant_not_found: () => "Merchant not found.",
        //   merchant_limited: () =>
        //     "Contact Black Support. Account has limited service.",
        //   invalid_balance: () =>
        //     "Either the current balance or the voucher amount has issues. Contact office.",
        //   redeemed_message: (amount: number, merchantName: string) =>
        //     `You have successfully redeemed R${amount} at ${toProperCase(merchantName)}. Thank you for using Black!`,
        //   voucher_redeemed_subject: () => "Voucher Redeemed",
        //   voucher_redeemed_body: (
        //     amount: number,
        //     merchantName: string,
        //     newMerchantBalance: number
        //   ) =>
        //     `Voucher of R${amount} redeemed at ${toProperCase(merchantName)}. New balance with Black is: R${newMerchantBalance}.`,
        //   unknown_error: () =>
        //     "An unknown error occurred, please try again or contact office.",
        // },
        black_now: {
            unauthenticated: () => "Request not authenticated. Please log in.",
            no_permissions: () => "User does not have permissions.",
            voucher_not_found: () => "Voucher not found.",
            exceeds_voucher_amount: () => "You can only redeem less or equal to the voucher amount.",
            customer_not_found: () => "Customer not found.",
            limit_exceeded: () => "Something went wrong. Amount can't be above set limit and your Now acc must be valid!",
            voucher_expired: () => "Voucher has expired.",
            voucher_not_active: () => "Voucher is not active.",
            merchant_not_found: () => "Merchant not found.",
            merchant_limited: () => "Contact Black Support. Account has limited service.",
            invalid_balance: () => "Either the current balance or the voucher amount has issues. Contact office.",
            // ✅ New messages for newNowVoucher
            voucher_must_be_positive: () => "Voucher must be a positive number.",
            customer_not_eligible: () => "Customer is not eligible for a Black Now Voucher.",
            outside_payday_window: () => "Vouchers can only be taken within 14 days before payday, but NOT on payday.",
            flagged_loans_support_required: () => "Your account requires support assistance due to past loan history. Please contact customer support.",
            exceeds_available_limit: (remaining, currency) => `Requested voucher amount exceeds available limit: ${currency}${remaining}`,
            // ✅ Existing Messages for Redeemed Vouchers
            redeemed_message: (amount, merchantName, currency) => `You have successfully redeemed ${currency}${amount} at ${(0, to_proper_case_1.toProperCase)(merchantName)}. Thank you for using Black!`,
            voucher_cancelled: () => "Voucher cancelled successfully.",
            voucher_redeemed_subject: () => "Voucher Redeemed",
            voucher_redeemed_body: (amount, merchantName, newMerchantBalance, currency) => `Voucher of ${currency}${amount} redeemed at ${(0, to_proper_case_1.toProperCase)(merchantName)}. New balance with Black is: R${newMerchantBalance}.`,
            // repayment
            loan_not_found: (loanNumber) => `Loan not found for loan number ${loanNumber}`,
            invalid_amount_repayment: () => "Enter a valid amount to make a loan payment.",
            insufficient_funds: () => "Insufficient funds to complete this payment.",
            loan_settled: (customerName, currency, amount) => `Hi ${customerName}. Payment of ${currency}${amount} received. Your loan is fully settled. Thank you!`,
            loan_payment_received: (customerName, currency, amountPaid, newBalance) => `Hi ${customerName}. Payment of ${currency}${amountPaid} received. Your balance is ${currency}${newBalance}. Thank you!`,
            can_not_proceed: () => "Cannot proceed. Please contact office.",
            amount_more_than_required: () => "Amount more than maximum required.",
            no_active_loans: () => "You have no active loans to repay.",
            unknown_error: () => "An unknown error occurred, please try again or contact office.",
        },
        system: {
            under_maintenance: () => "System Under Maintenance.",
        },
        universal: {
            missing_arguments: () => "Missing necessary arguments",
            unauthenticated: () => "Permissions denied. Please log in.",
            system_update_required: () => "System update required.",
            change_password_first: () => "Change Password first to proceed.",
            device_not_found: () => "Device not found. Register it first.",
            no_contract_found: () => "No contract found for Black Now Loan Agreement.",
            unknown_error: () => "An unknown error occurred, please try again or contact office.",
            safety_alert_title: () => "Safety Alerts",
            device_logged_in: (device) => `Your device: ${device} just logged into your Black wallet.`,
        },
    },
    pt: {
        accounts: {
            request_otp: () => "Solicite primeiro o OTP",
            otp_mismatch: () => "O OTP inserido não corresponde.",
            id_registered: () => "O ID já está registrado no sistema - prossiga para login.",
            phone_registered: () => "O número de celular já está registrado no sistema - prossiga para login.",
            success: () => "Cliente Black aprovado com sucesso",
            account_created: (name, memberNumber) => `Olá ${name}, sua conta de Comerciantes Informais foi criada com sucesso. ID do cliente: ${memberNumber}.`,
            admin_promotion: (name, email) => `Caro ${name}, você agora é um administrador da área de Comerciantes Informais. E-mail: ${email}. O escritório entrará em contato com você sobre sua senha.`,
            payment_message: (currency, amountPaid, accountBalance, loanNumber) => `${currency} ${amountPaid} pago da sua conta. Saldo restante é ${currency} ${accountBalance}. Ref: Pagamento do empréstimo - ${loanNumber}.`,
            payment_made: () => "Pagamento Efetuado",
        },
        loans: {
            withdrawal_success: (currency, actualLoanValue, memberNumber) => `Você retirou com sucesso ${currency}${actualLoanValue} de ${memberNumber}.`,
            new_loan: (name, currency, actualLoanAmount, currentDailyAdminFee, nextExpectedPayment) => `Olá ${name}, empréstimo de ${currency}${actualLoanAmount} aprovado. Taxa administrativa diária: ${currency}${currentDailyAdminFee}. Próximo pagamento: ${currency}${nextExpectedPayment}.`,
            loan_repayment_completed: (name, currency, amountPaid) => `Olá ${name}, pagamento de ${currency}${amountPaid} recebido. Seu empréstimo está totalmente liquidado.`,
            loan_repayment_partial: (name, currency, amountPaid, remainingBalance, dailyAdminFee, nextPayment) => `Olá ${name}, pagamento de ${currency}${amountPaid} recebido. Seu saldo restante é ${currency}${remainingBalance}, com uma taxa administrativa diária de ${currency}${dailyAdminFee}. Seu próximo pagamento é ${currency}${nextPayment}.`,
            loan_created: (name, currency, loanAmount) => `Olá ${name}, seu empréstimo de ${currency}${loanAmount} foi criado com sucesso. Lembre-se de fazer seus pagamentos em dia para construir um bom histórico de crédito.`,
            loan_exemption: (name, reason, endDate) => `Caro ${name}, seu Empréstimo para Comerciantes Informais foi isento de pagamentos pelo seguinte motivo: ${reason}. O período de carência termina em ${endDate}.`,
            grace_period_end: (name, endDate) => `Caro ${name}, seu período de carência termina hoje, ${endDate}. Você precisa começar a pagar seu empréstimo amanhã.`,
            missed_payment: (newLoanAmount, newAdminFee) => `Você perdeu um pagamento, e a taxa administrativa de hoje será adicionada ao valor devido. O novo valor do empréstimo é ${newLoanAmount}, a taxa administrativa é ${newAdminFee}.`,
            ban_lifted: (name) => `Caro ${name}, sua restrição com os comerciantes informais foi removida. Agora você pode obter um empréstimo para financiar seu estoque.`,
        },
        wallet: {
            wallet_deposit: (name, currency, amountDeposited, newBalance, customerReference) => `Olá ${name}, você depositou ${currency}${amountDeposited} na sua carteira. Novo saldo: ${currency}${newBalance}. Ref: ${customerReference}.`,
        },
        collections: {
            collection_receipt: (collecteeName, agentNumber, currency, actualCollected, collecteeReference) => `Olá ${collecteeName}, o agente ${agentNumber} coletou ${currency}${actualCollected} de você. Ref: ${collecteeReference}.`,
            collection_confirmation: (collectorName, currency, actualCollected, collecteeMemberNumber, collecteeReference) => `Olá ${collectorName}, você coletou ${currency}${actualCollected} de ${collecteeMemberNumber}. Ref: ${collecteeReference}.`,
        },
        savings: {
            savings_deposit: (name, currency, amount, savingsType, newBalance, customerReference) => `Olá ${name}, ${currency}${amount} depositado na sua poupança ${savingsType}. Novo saldo: ${currency}${newBalance}. Ref: ${customerReference}.`,
            savings_payout: (name, currency, nettSavings) => `Olá ${name}, você receberá ${currency}${nettSavings} pelos seus rendimentos de poupança este mês. A taxa de transferência foi de ${currency}20.00.`,
        },
        black_now: {
            unauthenticated: () => "Solicitação não autenticada. Por favor, faça login.",
            no_permissions: () => "Usuário não tem permissões.",
            voucher_not_found: () => "Voucher não encontrado.",
            exceeds_voucher_amount: () => "Você só pode resgatar um valor menor ou igual ao valor do voucher.",
            customer_not_found: () => "Cliente não encontrado.",
            limit_exceeded: () => "Algo deu errado. O valor não pode ultrapassar o limite definido e sua conta deve estar válida!",
            voucher_expired: () => "O voucher expirou.",
            voucher_not_active: () => "O voucher não está ativo.",
            merchant_not_found: () => "Comerciante não encontrado.",
            merchant_limited: () => "Entre em contato com o suporte do Black. A conta tem serviço limitado.",
            invalid_balance: () => "O saldo atual ou o valor do voucher tem problemas. Entre em contato com o escritório.",
            voucher_cancelled: () => "Voucher cancelado com sucesso.",
            // ✅ New messages for newNowVoucher
            voucher_must_be_positive: () => "O voucher deve ser um número positivo.",
            customer_not_eligible: () => "O cliente não é elegível para um Voucher Black Now.",
            outside_payday_window: () => "Os vouchers só podem ser retirados dentro de 14 dias antes do dia de pagamento, mas NÃO no dia de pagamento.",
            flagged_loans_support_required: () => "Sua conta requer assistência de suporte devido ao histórico de empréstimos. Por favor, entre em contato com o suporte ao cliente.",
            exceeds_available_limit: (remaining, currency) => `O valor solicitado do voucher excede o limite disponível: ${currency}${remaining}`,
            // ✅ Existing Messages for Redeemed Vouchers
            redeemed_message: (amount, merchantName, currency) => `Você resgatou com sucesso ${currency}${amount} em ${(0, to_proper_case_1.toProperCase)(merchantName)}. Obrigado por usar Black!`,
            voucher_redeemed_subject: () => "Voucher Resgatado",
            voucher_redeemed_body: (amount, merchantName, newMerchantBalance, currency) => `Voucher de ${currency}${amount} resgatado em ${(0, to_proper_case_1.toProperCase)(merchantName)}. Novo saldo no Black é: ${currency}${newMerchantBalance}.`,
            // repayment
            loan_not_found: (loanNumber) => `Empréstimo não encontrado para o número de empréstimo ${loanNumber}`,
            invalid_amount_repayment: () => "Insira um valor válido para efetuar o pagamento do empréstimo.",
            insufficient_funds: () => "Fundos insuficientes para concluir este pagamento.",
            can_not_proceed: () => "Não é possível continuar. Por favor, entre em contato com o escritório.",
            amount_more_than_required: () => "Valor superior ao máximo permitido.",
            loan_settled: (customerName, currency, amount) => `Olá ${customerName}. Pagamento de ${currency}${amount} recebido. Seu empréstimo está totalmente liquidado. Obrigado!`,
            loan_payment_received: (customerName, currency, amountPaid, newBalance) => `Olá ${customerName}. Pagamento de ${currency}${amountPaid} recebido. Seu saldo é ${currency}${newBalance}. Obrigado!`,
            no_active_loans: () => "Você não tem empréstimos ativos para pagar.",
            unknown_error: () => "Ocorreu um erro desconhecido, tente novamente ou entre em contato com o escritório.",
        },
        system: {
            under_maintenance: () => "Sistema em manutenção.",
        },
        universal: {
            missing_arguments: () => "Faltam argumentos necessários.",
            unauthenticated: () => "Permissões negadas. Por favor, faça login.",
            system_update_required: () => "Atualização do sistema necessária.",
            change_password_first: () => "Altere a senha primeiro para continuar.",
            device_not_found: () => "Dispositivo não encontrado. Registre-o primeiro.",
            no_contract_found: () => "Nenhum contrato encontrado para o Acordo de Empréstimo Black Now.",
            unknown_error: () => "Ocorreu um erro desconhecido, tente novamente ou entre em contato com o escritório.",
            safety_alert_title: () => "Alertas de Segurança",
            device_logged_in: (device) => `Seu dispositivo: ${device} acabou de acessar sua carteira Black.`,
        },
    },
};
// #######################################################
// ## getMessage function   ##
// #######################################################
// This function receives the category, key, customerCountryCode, and any additional parameters needed to build the message.
function getMessage(category, key, customerCountryCode, ...params) {
    const language = customerCountryCode === "MZ" ? "pt" : "en";
    // Explicitly extract the function type to avoid TypeScript errors
    const messageFunction = exports.messages[language][category][key];
    return messageFunction(...params);
}
