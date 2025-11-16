import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import ButtonS from "./ButtonS";
import useModal from "../hooks/useModal";
import { ListedProduct } from "../contexts/ProductContext";
import ProductEditModal from "./modals/ProductEditModal";
import { useState } from "react";
import StockEditModal from "./modals/StockEditModal";
import ConfirmationModal from "./modals/ConfirmationModal";


const style = StyleSheet.create({

})

type CartListItemProps = {
  productData: ListedProduct;
  setProductCb: (product: ListedProduct) => void;
  deleteProductCb: (productId: number) => void;
}

export default function ProductEditListItem({productData, setProductCb, deleteProductCb}: CartListItemProps) {
  const { name, price, stock } = productData;
  const [expanded, setExpanded] = useState(false); 

  const { showModal } = useModal();
  
  return (
    <View>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text>{name}</Text>
        <Text>{price}</Text>
        <Text>{stock}</Text>
      </TouchableOpacity>
      {expanded && <View>  
        <ButtonS callback={() => showModal(ProductEditModal, { productData, saveChangesCb: setProductCb })}>Editar</ButtonS>
        <ButtonS callback={() => showModal(StockEditModal, { productData, saveChangesCb: setProductCb })}>Estoque</ButtonS>
        <ButtonS callback={() => showModal(ConfirmationModal, {
          confirmCb: () => {deleteProductCb(productData.id)},
          declineCb: () => {}
        })}>Remover</ButtonS>
      </View>}
    </View>
  )
}