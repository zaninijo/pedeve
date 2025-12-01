import { useCallback, useRef } from "react";
import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import InputBox from '../InputBox'
import { Text, View } from "react-native";
import { colorDict } from "../../styles/globalStyles";
import { ListedProduct } from "../../contexts/ProductContext";

type StockEditModalProps = {
  productData: ListedProduct;
  saveChangesCb: (product: ListedProduct) => void;
}

const StockEditModal: ModalComponent<StockEditModalProps> = ({onClose, productData, saveChangesCb}) => {
  const stockInput = useRef(productData?.stock || 0);

  const incrementStock = useCallback((amount: number) => {
    stockInput.current += amount;
  }, [stockInput]);

  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
        <Text>Registre a quantidade em estoque a seguir:</Text>
        <View>
          <ButtonS callback={incrementStock(-1)}>-</ButtonS>
          <InputBox defaultValue={stockInput.current?.toString()} placeholder="Quantidade" onChangeText={(t) => {stockInput.current = Number(t)}} />
          <ButtonS callback={incrementStock(1)}>+</ButtonS>
        </View>
        <ButtonS color={colorDict.white} callback={() => {
          saveChangesCb({...productData, stock: stockInput.current})
          close();
        }}>Salvar</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default StockEditModal;
