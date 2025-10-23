import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavContext } from "../contexts/navContext";
import { useProductsData } from "../contexts/productContext";
import { useCart } from "../contexts/cartContext";
import defaultAlert from "../utils/defaultAlert";
import { useEffect } from "react";

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#111",
  },
  text: {
    color: "white",
    fontSize: 22,
  },
});

export default function HomeScreen() {
  const { goToScreen } = useNavContext();
  const { flushCart } = useCart();
  const { updateProductList, isLoading: productListLoading } =
    useProductsData();

  // Limpa o carrinho toda vez que abre a tela
  useEffect(flushCart, []);

  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={async () => {
        try {
          updateProductList();
        } catch (error) {
          defaultAlert();
        }

        goToScreen("scanner");
      }}
    >
      <Text style={styles.text}>Pentdraive 🟢</Text>
      <Text>Aperte aqui para começar a comprar!</Text>

      <link
        onClick={() => {
          goToScreen("admin");
        }}
        // Sobrepondo a captura do TouchableWithoutFeedback
        style={{ zIndex: 5 }}
      >
        Abrir painel de gerenciamento para administradores.
      </link>

      {
        // Overlay durante o fetcn da lista de produtos
        // TODO: Adicionar spinner de carregamento
        productListLoading && (
          <View>
            <Text>Carregando</Text>
          </View>
        )
      }
    </TouchableWithoutFeedback>
  );
}
