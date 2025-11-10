// O aplicativo é um Proof of Concept, por isso esse módulo não está ligada a nenhuma API de pagamento real.
import { useState, useRef } from "react";
import PaymentModule from "../types/paymentModule";

export default function usePix(): PaymentModule {
  const transactionUri = useRef<string|undefined>(undefined);
  const [isTransactionInitiated, setTransactionInitiated] = useState(false);
  const [isTransactionFinished, setTransactionFinished] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState<boolean|undefined>(undefined);
  const [initializationError, setInitializationError] = useState<Error|null>(null);
  const [transactionError, setTransactionError] = useState<Error|null>(null);

  function reset() {
    setTransactionInitiated(false);
    setTransactionFinished(false);
    setTransactionSuccessful(undefined);
    setInitializationError(null);
    setTransactionError(null);
  }

  // Começa uma nova transação e sobrepõe transação anterior
  async function startTransaction(value: number) {
    reset();

    // TODO: Ligar função na API, assim que pronto.

    setTimeout(() => { // Mockup para simular um request em API de pagamento
      setTransactionInitiated(true)
    }, 800)

    transactionUri.current = "https://github.com/zaninijo";

    return transactionUri.current; // Dados para o pagamento ficam aqui
  }

  return {
    startTransaction,
    transactionUri,
    isTransactionInitiated,
    isTransactionFinished,
    isTransactionSuccessful,
    initializationError,
    transactionError,
  };
}
