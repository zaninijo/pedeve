import { RefObject } from "react";

export default interface PaymentModule {
  startTransaction: (value: number) => Promise<string|null>;
  transactionUri: RefObject<string|undefined>
  isTransactionInitiated: boolean;
  isTransactionFinished: boolean;
  isTransactionSuccessful: boolean|undefined;
  initializationError: Error|null;
  transactionError: Error|null
}