import { ScrollView, View } from "react-native";
import { useCart } from "../contexts/CartContext";
import CartListItem from "../components/CartListItem";
import { useCallback } from "react";
import ButtonL from "../components/ButtonL";
import { useNavContext } from "../contexts/NavContext";
import { colorDict } from "../styles/globalStyles";

export default function CartScreen() {
  
  const { cart, updateCartProduct, getCartInfo } = useCart();

  const { goToScreen } = useNavContext()

  const increment = useCallback((cartItem, incrementQnt) => {
    updateCartProduct(cartItem.barcode, {...cartItem, quantity: cartItem.quantity + incrementQnt})
  }, [])

  return (
    <View>
      <ScrollView>
        {
          cart.map((cartItem) => {
            return (
              <CartListItem
                cartItem={cartItem}

                increase={() => {
                  increment(cartItem, 1);
                }}
                
                decrease={() => {
                  increment(cartItem, -1);
                }}
              />
            );
          })
        }

      </ScrollView>
      <ButtonL color={colorDict.white} callback={() => {goToScreen("scanner")}}>Escanear Produto</ButtonL>
      <ButtonL color={colorDict.peacockTeal} callback={() => { 
        const { isEmpty }= getCartInfo();
        isEmpty ? goToScreen("home") : goToScreen("checkout");
      }}>Finalizar Compra</ButtonL>
      <ButtonL color={colorDict.rubyRed} callback={() => {goToScreen("home")}}>Cancelar</ButtonL>
    </View>
  )
}