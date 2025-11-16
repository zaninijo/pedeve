
/*
  Esse componente serve como exemplo de uma estrutura básica de modal,
  utilizando o sistema de contexto para acessar lógicas externas inacessíveis ao componente.
*/

import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text } from "react-native";

const _ExampleModal: ModalComponent & {} = ({onClose}) => {  
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
        <Text>Oi, eu sou um modal!</Text>
        <ButtonS callback={close}>OK</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default _ExampleModal;
