import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text, TextInput } from "react-native";
import { useNavContext } from "../../contexts/NavContext"
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useModal from "../../hooks/useModal";
import NotificationModal from "./NotificationModal";

const LoginModal: ModalComponent & {} = ({onClose}) => {

  const { goToScreen } = useNavContext();
  const { passwordLogin } = useAuth();
  const { showModal } = useModal();
  const [loginSuccessful, setLoginSuccessful] = useState<boolean|undefined>(undefined)

  const typedPassword = useRef("");
  
  async function checkCredentials(cb: () => void) {
    const sessionData = await passwordLogin(typedPassword.current);
    
    sessionData
      ? showModal(NotificationModal, {
        message: "Não foi possível realizar o login. Tente novamente.",
        onClose: () => showModal(LoginModal),
      })
      : cb();
  }
  
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
      <Text>Olá, seja bem-vindo ao Pentdraive! Para começar a usar, utilize a senha de acesso que foi fornecida para esse ponto de venda.</Text>
      <TextInput placeholder="Senha" onChangeText={t => {typedPassword.current = t}}/>
      <Text onPress={() => {/* TODO: Adicionar modal de recuperação de senha */}}>Esqueceu sua senha?</Text>

      <ButtonS callback={async () => {await checkCredentials(close)}}>Entrar</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default LoginModal;
