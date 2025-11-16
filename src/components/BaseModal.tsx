
import { TouchableWithoutFeedback, View } from "react-native";
import { createContext, useCallback } from "react";
import { ModalComponent } from "../types/modalComponent";
import useModal from "../hooks/useModal";

type ModalContextType = {
  close: () => void;
}

const ModalContext = createContext<ModalContextType>({close: () => {
  throw new Error("ModalContext usado fora de BaseModal");
}});

export const ModalContextConsumer = ModalContext.Consumer;

const BaseModal: ModalComponent = ({onClose, children}) => {

  const { flushModal } = useModal();

  const close = useCallback((): void => {
    // TODO: Escrever código de fechamento (animações, etc.)
    
    // A lógica de remoção do componente da árvore fica em onClose, precisa ser executado por último.
    onClose ? onClose() : flushModal(); // Fallback para onClose indefinido.
  }, [onClose])
  
  return <ModalContext.Provider value={{close}}>
    <View>
      <View>
        {children}
      </View>
      <TouchableWithoutFeedback onPressOut={close} /> {/* Overlay que borra o fundo e serve como escape do modal */}
    </View>
  </ModalContext.Provider>
}

export default BaseModal