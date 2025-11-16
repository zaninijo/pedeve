// O aplicativo é um Proof of Concept, por isso esse módulo não está ligada a nenhuma API de pagamento real.
// Esse módulo apenas simula um pagamento por aproximação. As informações do cartão não são utilizadas ou armazenadas.

import { useRef, useState, useCallback, useEffect } from 'react';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import PaymentModule from '../types/paymentModule';
import { apiFetch } from '../utils/api';

if (NfcManager.start) NfcManager.start().catch(() => {});

export function useContactless(): PaymentModule {
  const transactionUri = useRef<string|undefined>(undefined);
  const [isTransactionInitiated, setTransactionInitiated] = useState(false);
  const [isTransactionFinished, setTransactionFinished] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState<boolean|undefined>(undefined);
  const [initializationError, setInitializationError] = useState<Error|null>(null);
  const [transactionError, setTransactionError] = useState<Error|null>(null);

  const abortRef = useRef<AbortController|null>(null);

  const reset = useCallback(() => {
    setTransactionInitiated(false);
    setTransactionFinished(false);
    setTransactionSuccessful(undefined);
    setInitializationError(null);
    setTransactionError(null);
    transactionUri.current = undefined;
    try { abortRef.current?.abort(); } catch {}
    abortRef.current = null;
  }, []);

  const buildPayload = useCallback((value: number) => {
    const now = new Date();
    return {
      merchantTransactionId: `tx_${Math.floor(Math.random() * 1e8)}`,
      amount: Math.round(value * 100),
      currency: 'BRL',
      paymentMethod: 'contactless_emv',
      emv: {
        aid: 'A0000000031010',
        pan_masked: '**** **** **** 4242',
        expiry_month: String(now.getMonth() + 1).padStart(2, '0'),
        expiry_year: String(now.getFullYear() + 2),
        atc: '0010',
        arqc: '9F2608A1B2C3D4E5F6A7B8C9',
        unpredictable_number: '4E3F2A1B',
        raw_tlvs_hex: '9F2608A1B2C3D4E5F6A79F36020010',
      },
      metadata: { device: 'react-native', note: 'POC — sem dados reais' },
    };
  }, []);

  const sendToBackend = useCallback(async (payload: any) => {
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;
    transactionUri.current = `/payments/${payload.merchantTransactionId}`;

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    };

    // TODO: Integrar com API
    const response = await apiFetch(['payments', 'process'], options, true);
    return response;
  }, []);

  async function startTransaction(value: number) {
    reset();
    if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
      const err = new Error('Valor inválido para transação');
      setInitializationError(err);
      throw err;
    }

    const payload = buildPayload(value);
    transactionUri.current = `/payments/${payload.merchantTransactionId}`;

    try {

      const supported = await NfcManager.isSupported();
      if (!supported) {
        setInitializationError(new Error('NFC não suportado. Simulando o pagamento sem aproximação...'));
        await new Promise(r => setTimeout(r, 600));
        setTransactionInitiated(true);
        const response = await sendToBackend(payload);
        const ok = response?.status === 200;
        setTransactionFinished(true);
        setTransactionSuccessful(ok);
        if (!ok) throw new Error('Falha na transação');
        return transactionUri.current;
      }

      const enabled = await NfcManager.isEnabled();
      if (!enabled) {
      // NFC suportado mas desligado
      const msg = 'O NFC está desativado. Ative o NFC nas configurações para continuar.';
      setInitializationError(new Error(msg));
        try {
          await NfcManager.goToNfcSetting();
        } catch (e) {
          console.warn('Não foi possível abrir as configurações NFC:', e);
        }
        throw new Error(msg);
      }

      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.IsoDep, { alertMessage: 'Aproxime o cartão' });
      setTransactionInitiated(true);
      await NfcManager.getTag().catch(() => null);

      const response = await sendToBackend(payload);
      const ok = response?.status === 200;
      setTransactionFinished(true);
      setTransactionSuccessful(ok);
      if (!ok) throw new Error('Falha na transação');
      return transactionUri.current;
    } catch (err: any) {
      setTransactionFinished(true);
      setTransactionSuccessful(false);
      setTransactionError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      try { await NfcManager.cancelTechnologyRequest(); } catch {}
      try { await NfcManager.close(); } catch {}
    }
  }

  useEffect(() => {
    return () => {
      try { abortRef.current?.abort(); } catch {}
      (async () => {
        try { await NfcManager.cancelTechnologyRequest(); } catch {}
        try { await NfcManager.close(); } catch {}
      })();
    };
  }, []);

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

export default useContactless;
