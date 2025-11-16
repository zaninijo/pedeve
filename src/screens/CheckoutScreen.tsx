import { View, Text, TouchableWithoutFeedback } from "react-native";
import PaymentMethodButton from "../components/PaymentMethodButton";
import { useState, useEffect } from "react";
import { useNavContext } from "../contexts/NavContext";
import ButtonL from "../components/ButtonL";
import { useCart } from "../contexts/CartContext";
import usePix from "../hooks/usePix";
import PixQrCode from "../components/PixQrCode";
import defaultAlert from "../utils/defaultAlert"
import useContactless from "../hooks/useContactless";

export type PaymentMethodType = "pix"|"debit-card"|"credit-card"|string|undefined;

type PaymentComponent = {
  purchaseValue: number,
  onSuccessful: () => any;
  onFailed: () => any;
}

function ContactlessComponent({purchaseValue, onSuccessful, onFailed}: PaymentComponent) {
  const {
    startTransaction,
    isTransactionInitiated,
    isTransactionFinished,
    isTransactionSuccessful,
    initializationError,
    transactionError,
  } = useContactless();

  const { goToScreen } = useNavContext();

  useEffect(() => {
    startTransaction(purchaseValue);
  }, [])

  useEffect(() => {
    isTransactionSuccessful ? onSuccessful() : onFailed();
  }, [isTransactionFinished]);
  
  useEffect(() => {
    defaultAlert(() => goToScreen("cart"));
  }, [initializationError, transactionError]);

  return (
    <View>
      {
        isTransactionInitiated
        ? <>
          {/* TODO: Substituir por um SVG de contactless */}
          <Text> Aproxime seu cartão </Text>
        </> 
        : <>
          {/* TODO: Adicionar spinner para carregamento do pagamento */}
          <Text>Carregando</Text>
        </>
      }
    </View>
  )
}

function PixComponent({purchaseValue, onSuccessful, onFailed}: PaymentComponent) {
  const {
    startTransaction,
    transactionUri,
    isTransactionInitiated,
    isTransactionFinished,
    isTransactionSuccessful,
    initializationError,
    transactionError,
  } = usePix();

  const { goToScreen } = useNavContext();

  useEffect(() => {
    startTransaction(purchaseValue);
  }, [])

  useEffect(() => {
    isTransactionSuccessful ? onSuccessful() : onFailed();
  }, [isTransactionFinished]);
  
  useEffect(() => {
    defaultAlert(() => goToScreen("cart"));
  }, [initializationError, transactionError]);

  return (
    <View>
      {
        isTransactionInitiated
          ? <PixQrCode data={transactionUri.current!} />
          : <>{/* TODO: Adicionar spinner para carregamento do QR */}</>
      }
    </View>
  )
}

// TODO: Colocar SVGs nos overlays
function SuccessOverlay() {
  return (
    <TouchableWithoutFeedback>
      <Text>Pagamento Realizado!</Text>
    </TouchableWithoutFeedback>
  )
}

function FailureOverlay() {
  return (
    <TouchableWithoutFeedback>
      <Text>Algo deu errado. Por favor, tente novamente.</Text>
    </TouchableWithoutFeedback>
  )
}

type PaymentWrapperProps = {
  paymentMethod: PaymentMethodType;
}

function PaymentWrapper({paymentMethod}: PaymentWrapperProps) {
  const { getCartInfo } = useCart();
  const { totalPrice } = getCartInfo(); 

  const [ isPaymentSuccessful, setPaymentSuccessful ] = useState<boolean|undefined>(undefined)

  const { goToScreen } = useNavContext();
  
  if (!paymentMethod) return null;

  return (
    <View>
      <Text>Valor da Compra: {totalPrice}</Text>
      <Text>Aguardando pagamento...</Text>

      {(paymentMethod == "debit-card" || paymentMethod == "credit-card") && (
        <ContactlessComponent
          purchaseValue={totalPrice}
          onSuccessful={() => setPaymentSuccessful(true)}
          onFailed={() => setPaymentSuccessful(false)}
        />
      )}

      {paymentMethod == "pix" && (
        <PixComponent
          purchaseValue={totalPrice}
          onSuccessful={() => setPaymentSuccessful(true)}
          onFailed={() => setPaymentSuccessful(false)}
        />
      )}

      {isPaymentSuccessful === true && <SuccessOverlay />}
      {isPaymentSuccessful === false && <FailureOverlay />}

      <ButtonL callback={() => goToScreen("cart")}>Cancelar Pagamento</ButtonL>
    </View>
  );
}

export default function CheckoutScreen() {
  const { goToScreen } = useNavContext();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(undefined);

  if (paymentMethod) {
    return <PaymentWrapper paymentMethod={paymentMethod} />
  }

  return (
    <View>  
      <PaymentMethodButton methodName={"debit-card"} icon={""} callback={setPaymentMethod}>Débito</PaymentMethodButton>
      <PaymentMethodButton methodName={"credit-card"} icon={""} callback={setPaymentMethod}>Crédito</PaymentMethodButton>
      <PaymentMethodButton methodName={"pix"} icon={""} callback={setPaymentMethod}>PIX</PaymentMethodButton>

      <Text>Esqueceu alguma coisa?</Text>
      <ButtonL callback={() => goToScreen("cart")}>Voltar ao carrinho</ButtonL>
    </View>
  )
}
