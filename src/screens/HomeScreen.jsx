import { View, StyleSheet, TouchableWithoutFeedback, Pressable, Text } from "react-native";
import { useNavContext } from "../contexts/NavContext";
import { useProductsData } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import defaultAlert from "../utils/defaultAlert";
import { useEffect } from "react";
import useModal from "../hooks/useModal";
import AdminAuthModal from '../components/modals/AdminAuthModal';
import { text, colors } from "../styles/globalStyles";

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#111",
  }
});

export default function HomeScreen() {
  const { goToScreen } = useNavContext();
  const { flushCart } = useCart();
  const { updateProductList, isLoading: productListLoading } = useProductsData();
  const { showModal, flushModal } = useModal();

  // Limpa o carrinho toda vez que abre a tela
  useEffect(() => flushCart(), []);

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
      <View style={{backgroundColor: colors.creamyWhite}}>
        <Text style={text.heading}>Pentdraive</Text>
        <View>
          <Text>Toque para começar</Text>
        </View>

        <Pressable
          onClick={() => {
            showModal(AdminAuthModal, { onClose: flushModal });
          }}
          // Sobrepondo a captura do TouchableWithoutFeedback
          style={{ zIndex: 5 }}
        >
          <Text>
            Abrir painel de gerenciamento para administradores.
          </Text>
        </Pressable>

        {
          // Overlay durante o fetch da lista de produtos
          // TODO: Adicionar spinner de carregamento
          productListLoading && (
            <View>
              <Text>Carregando</Text>
            </View>
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
}
