import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text } from "react-native";

type ConfirmationModalProps = {
    confirmCb: () => void;
    declineCb: () => void;
}

const ConfirmationModal: ModalComponent<ConfirmationModalProps> = ({onClose, confirmCb, declineCb}) => {
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
      <Text>Você deseja confirmar essa ação?</Text>
    
      <ButtonS callback={() => {confirmCb(); close()}}>Sim</ButtonS>
      <ButtonS callback={() => {declineCb(); close()}}>Não</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default ConfirmationModal;
