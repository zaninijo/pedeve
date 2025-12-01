import { View, ScrollView } from "react-native";
import { useNavContext } from "../contexts/NavContext"
import ButtonL from "../components/ButtonL";
import { colorDict } from "../styles/globalStyles";
import { ListedProduct, useProductsData } from "../contexts/ProductContext";
import ProductEditListItem from "../components/ProductEditListItem"
import { useCallback, useState } from "react";
import useModal from "../hooks/useModal";
import ProductEditModal from "../components/modals/ProductEditModal";
import { apiFetch } from "../utils/api";

export const credentialArgName = "credential"

export default function AdminScreen() {
  const { screenArgs, goToScreen } = useNavContext();
  const { productsData } = useProductsData();
  const { showModal } = useModal();

  const [editedProducts, setEditedProducts] = useState(productsData!);

  // Adiciona ou sobrescreve um produto
  const setProduct = useCallback((productData: ListedProduct) => {
    const newProductList = editedProducts;
    const { id: productId } = productData
    
    const foundIndex = newProductList.findIndex((p) => {
      return p.id = productId;
    });

    if (foundIndex > -1) {
      newProductList.splice(foundIndex, 1, productData);
    }
    else {
      newProductList.push(productData);
    }

    setEditedProducts(newProductList);
  }, [editedProducts, screenArgs]);

  // Remove um produto na lista usando seu id
  function removeProduct(productId: number) {
    const newProductList = editedProducts;
    
    const foundIndex = newProductList.findIndex((p) => {
      return p.id = productId;
    });

    if (foundIndex > -1) {
      newProductList.splice(foundIndex, 1);
      setEditedProducts(newProductList);
    }
  }

  const adminCredential = screenArgs.current?.[credentialArgName];

  if (!adminCredential) {
    throw new Error("A tela de administração foi executada sem argumentos de credencial.");
  }

  function saveChanges() {
    apiFetch(["products/update"], { method:"POST", body: editedProducts.toString() }, true)
  }
  
  return <View>

    <ScrollView>
      {productsData!.map((pdata) => {
        return <ProductEditListItem productData={pdata} setProductCb={setProduct} deleteProductCb={removeProduct} />
      })}
    </ScrollView>

    <ButtonL color={colorDict.white} callback={() => showModal(ProductEditModal, { saveChangesCb: setProduct })}>Adicionar Produto</ButtonL>
    <ButtonL color={colorDict.peacockTeal} callback={() => { goToScreen("home") }}>Finalizar Edição</ButtonL>
  </View>

}