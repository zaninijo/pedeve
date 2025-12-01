import { useRef, useState } from "react";
import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text, View } from "react-native";
import { colorDict } from "../../styles/globalStyles";
import BarcodeScanner from "../BarcodeScanner";

type BarcodeScannerModalProps = {
  callback: (scannedCode: number) => void;
}

const BarcodeScannerModal: ModalComponent<BarcodeScannerModalProps> = ({onClose, callback}) => {

  return <BaseModal onClose={onClose}>
    <Text>Registre as informações do produto a seguir:</Text>
    <BarcodeScanner scanCallback={callback} />
    <ButtonS color={colorDict.white} callback={callback}>Cancel</ButtonS>
  </BaseModal>
}

export default BarcodeScannerModal;