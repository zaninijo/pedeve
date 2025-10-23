import { View } from "react-native";
import PaymentMethodButton from "../components/PaymentMethodButton";
import { useCallback, useState } from "react";
import { useNavContext } from "../contexts/navContext";
import ButtonL from "../components/ButtonL";

type PaymentMethods = "pix"|"debit-card"|"credit-card"

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { goToScreen } = useNavContext();

  const startPayment = useCallback(() => {

  }, [paymentMethod])

  return <View>
    <PaymentMethodButton methodName={"debit-card"} icon={""} callback={}></PaymentMethodButton>
    <PaymentMethodButton methodName={"credit-card"} icon={""} callback={}></PaymentMethodButton>
    <PaymentMethodButton methodName={"pix"} icon={""} callback={() => {startPayment(props.methodName)}}></PaymentMethodButton>

    <ButtonL callback={goToScreen("cart")}>Oi</ButtonL>
  </View>;
}
