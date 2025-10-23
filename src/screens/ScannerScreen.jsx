import { View } from "react-native";
import { useCart } from "../contexts/cartContext";
import CartListItem from "../components/CartListItem";
import BarcodeScanner from "../components/BarcodeScanner"

export default function ScannerScreen() {
  const { cart, updateCartProduct, addCartProduct } = useCart();
  const lastItem = cart[cart.length - 1] || null;

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
    </View>
  );
}
