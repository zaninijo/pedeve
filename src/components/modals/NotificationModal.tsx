import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text } from "react-native";

type NotificationModalProps = {
  message: string
}

const NotificationModal: ModalComponent<NotificationModalProps> = ({onClose, message}) => {
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
      <Text>{message}</Text>
    
      <ButtonS callback={close}>Ok</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default NotificationModal;
