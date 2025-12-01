import { View } from "react-native";
import { useCart } from "../contexts/CartContext";
import CartListItem from "../components/CartListItem";
import BarcodeScanner from "../components/BarcodeScanner"
import ButtonL from "../components/ButtonL";
import { useNavContext } from "../contexts/NavContext";
import { colorDict, spacingDict } from "../styles/globalStyles"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScannerScreen() {
  const { cart, updateCartProduct, addCartProduct } = useCart();
  const lastItem = cart[cart.length - 1] || null;

  const notBarInset = useSafeAreaInsets();

  const { goToScreen } = useNavContext();

  return (
    <View style={{flex: 1, padding: 32, paddingTop: 32+notBarInset.top, gap: spacingDict.l, backgroundColor: colorDict.creamyWhite }}>
      <View style={{flex: 1, borderTopWidth: 2, borderBottomWidth: 2, borderStyle: 'solid'}}>
        <BarcodeScanner scanCallback={addCartProduct}/>
        {lastItem && <CartListItem
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
        />}
      </View>
      
      <ButtonL callback={() => goToScreen("cart")}>Ver Carrinho</ButtonL>
    </View>
  );
}
