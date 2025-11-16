import { ModalComponent } from "../../types/modalComponent";
import BaseModal, { ModalContextConsumer } from "../BaseModal";
import ButtonS from "../ButtonS"
import { Text, TextInput } from "react-native";
import { useNavContext } from "../../contexts/NavContext"
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { credentialArgName } from "../../screens/AdminScreen";

const AdminAuthModal: ModalComponent & {} = ({onClose}) => {

  const { goToScreen } = useNavContext();
  const { passwordLogin } = useAuth();

  const typedPassword = useRef("");
  
  async function checkCredentials() {
    const sessionData = await passwordLogin(typedPassword.current);
    
    if (sessionData) {
      goToScreen("admin", { [credentialArgName]:  sessionData.password });
    }
  }
  
  return <BaseModal onClose={onClose}>
    <ModalContextConsumer>{ ({ close }) => (<>
      <Text>Para modificar, adicionar e remover produtos do ponto de vendas, use a senha de admistrador</Text>
      
      <TextInput placeholder="Senha" onChangeText={(t) => {typedPassword.current = t}}/>
      <Text onPress={() => {/* TODO: Adicionar modal de recuperação de senha */}}>Esqueceu sua senha?</Text>

      <ButtonS callback={async () => {await checkCredentials(); close()}}>Entrar</ButtonS>
    </>) }</ModalContextConsumer>
  </BaseModal>
}

export default AdminAuthModal;
