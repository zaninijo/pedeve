import { View } from "react-native";
import { useCart } from "../contexts/CartContext";
import CartListItem from "../components/CartListItem";
import BarcodeScanner from "../components/BarcodeScanner"
import ButtonL from "../components/ButtonL";
import { useNavContext } from "../contexts/NavContext";

export default function ScannerScreen() {
  const { cart, updateCartProduct, addCartProduct } = useCart();
  const lastItem = cart[cart.length - 1] || null;

  const { goToScreen } = useNavContext();

  return (
    <View>
      
      <BarcodeScanner scanCallback={addCartProduct}/>

      <CartListItem
        cartItem={lastItem}
        increase={() => {
          updateCartProduct(lastItem.barcode, {
            ...lastItem,
            quantity: lastItem.quantity + 1,
          });
        }}
        decrease={() => {
          updateCartProduct(lastItem.barcode, {
            ...lastItem,
            quantity: lastItem.quantity - 1,
          });
        }}
      />
      <ButtonL callback={() => goToScreen("cart")}>Ver Carrinho</ButtonL>
    </View>
  );
}
