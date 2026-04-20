declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeOptions {
    mode: 'sandbox' | 'production';
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_parent' | '_top';
  }

  export interface Cashfree {
    checkout(options: CheckoutOptions): Promise<void>;
  }

  export function load(options: CashfreeOptions): Promise<Cashfree>;
}
