import { useEffect, useRef, useState } from "react";
import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import InputBox from '../InputBox'
import { Text, View } from "react-native";
import { colorDict } from "../../styles/globalStyles";
import { ListedProduct } from "../../contexts/ProductContext";
import useModal from "../../hooks/useModal";
import BarcodeScannerModal from "./BarcodeScannerModal";

type ProductEditModalProps = {
  productData?: Partial<ListedProduct>;
  saveChangesCb: (product: ListedProduct) => void;
}

const ProductEditModal: ModalComponent<ProductEditModalProps> = ({onClose, productData, saveChangesCb}) => {
  const nameInput = useRef(productData?.name);
  const priceInput = useRef(productData?.price?.toString());
  const barcodeInput = useRef(productData?.barcode?.toString());

  const [productDataValid, setProductDataValid] = useState(false);

  function updateValidation() {
    if (!nameInput.current || Number(priceInput.current) <= 0 || !barcodeInput.current) {
      setProductDataValid(false); return;
    }; 
    setProductDataValid(true);
  }
  
  const { showModal } = useModal();

  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
        <Text>Registre as informações do produto a seguir:</Text>
        <InputBox defaultValue={nameInput.current} placeholder="Nome e Características do Produto" onChangeText={(t) => {nameInput.current = t; updateValidation()}}/>
        <InputBox defaultValue={priceInput.current} placeholder="Valor Unidade (R$)" onChangeText={(t) => {priceInput.current = t; updateValidation()}} />
        <View>
          <InputBox defaultValue={barcodeInput.current} placeholder="Nº do Código de Barras" onChangeText={(t) => {barcodeInput.current = t; updateValidation()}} />
          <ButtonS disabled={!productDataValid} callback={ () => {
            showModal(BarcodeScannerModal, {
              // reiniciar o Modal do ProductEdit com persistência dos dados e barcode novo.
              callback: (code) => showModal(ProductEditModal, { saveChangesCb, onClose, productData: {...productData, barcode: code} }),
              // reiniciar o Modal do ProductEdit com os mesmos dados.
              onClose: () => showModal(ProductEditModal, { saveChangesCb, onClose, productData })
            })
          }}>Escanear</ButtonS>
        </View>

        <ButtonS color={colorDict.white} callback={() => {
          close();
          
          const pdata = productData as ListedProduct;

          const newProductData: ListedProduct = {
            id: pdata.id || pdata.barcode,
            barcode: pdata.barcode,
            name: pdata.name,
            price: pdata.price,
            stock: pdata.stock || 0
          }

          saveChangesCb(newProductData);

        }}>Salvar</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default ProductEditModal;
