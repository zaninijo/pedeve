import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text, TextInput } from "react-native";
import { useNavContext } from "../../contexts/NavContext"
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useModal from "../../hooks/useModal";
import NotificationModal from "./NotificationModal";
import InputBox from "../InputBox";
import RedirectPressable from "../RedirectPressable";

const LoginModal: ModalComponent & {} = ({onClose}) => {

  const { passwordLogin, authToken } = useAuth();
  const { showModal, flushModal } = useModal();
  const [loginLoading, setLoginLoading] = useState<boolean|undefined>(undefined)

  const typedPassword = useRef("");

  useEffect(() => {
    if (authToken) {
      flushModal();
    }
  }, [authToken])
  
  async function checkCredentials(cb: () => void) {
    const sessionData = await passwordLogin(typedPassword.current);

    sessionData
      ? cb()
      : showModal(NotificationModal, {
        message: "Não foi possível realizar o login. Tente novamente.",
        onClose: () => showModal(LoginModal),
      });
  }
  
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
      <Text>Olá, seja bem-vindo ao Pentdraive! Para começar a usar, utilize a senha de acesso que foi fornecida para esse ponto de venda.</Text>
      <InputBox placeholder="Senha" onChangeText={t => {typedPassword.current = t}}/>
      <RedirectPressable onPress={() => {/* TODO: Adicionar modal de recuperação de senha */}}>Esqueceu sua senha?</RedirectPressable>
      <ButtonS callback={async () => {await checkCredentials(close)}}>Entrar</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default LoginModal;
