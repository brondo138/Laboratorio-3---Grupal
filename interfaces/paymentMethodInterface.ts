export interface PaymentMethodInterface {
    processPayment(total: number): Promise<boolean>;
}
