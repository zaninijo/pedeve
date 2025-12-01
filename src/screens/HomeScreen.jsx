import { View, TouchableWithoutFeedback, Text, ActivityIndicator } from "react-native";
import { useNavContext } from "../contexts/NavContext";
import { useProductsData } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import defaultAlert from "../utils/defaultAlert";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import AdminAuthModal from '../components/modals/AdminAuthModal';
import { textStyle, colorDict, spacingDict } from "../styles/globalStyles";
import RedirectPressable from "../components/RedirectPressable";

export default function HomeScreen() {
  const { goToScreen } = useNavContext();
  const { flushCart } = useCart();
  const { updateProductList, isLoading } = useProductsData();
  const { showModal, flushModal } = useModal();
  const [touchEnabled, setTouchEnabled] = useState(true);

  useEffect(() => flushCart(), []);
  
  async function handleStart() {
    if (!touchEnabled) return;
    setTouchEnabled(false);
    try {
      updateProductList();
      goToScreen("scanner");
    } catch {
      defaultAlert();
    }
    setTouchEnabled(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleStart} disabled={!touchEnabled}>
        <View style={{backgroundColor: colorDict.creamyWhite, flex: 1, alignItems: "center", paddingVertical: spacingDict.xl}}>
          <View style={{justifyContent: "space-between", flex: 1}}>
            <View style={{gap: 48, alignItems: "center", justifyContent: "center", flexGrow: 1}}>
              <View>
                <Text style={{...textStyle.heading, color: colorDict.peacockTeal}}>Pentdraive</Text>
                <Text style={{...textStyle.l, fontWeight: "semibold"}}>
                  Ponto de vendas autônomo{"\n"}
                  para compras rápidas e simples.
                </Text>
              </View>

              <View style={{width: 314, paddingVertical: 14, backgroundColor: colorDict.offBlack, borderRadius: 8}}>
                <Text style={{color: colorDict.white, ...textStyle.l}}>Toque para começar</Text>
              </View>
            </View>

            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <RedirectPressable
                onPress={() => showModal(AdminAuthModal)}
                textAlign="center"
                style={{zIndex: 20}}
              >
                Acessar painel de gerenciamento
              </RedirectPressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {isLoading && (
        <View style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}>
          <ActivityIndicator size="large" color={colorDict.peacockTeal} />
          <Text style={{...textStyle.l, marginTop: 16, color: colorDict.peacockTeal}}>
            Carregando produtos...
          </Text>
        </View>
      )}
    </View>
  );
}
