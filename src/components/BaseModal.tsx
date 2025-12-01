import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { createContext, useCallback } from "react";
import { ModalComponent } from "../types/modalComponent";
import useModal from "../hooks/useModal";
import { borderRadiusDict, colorDict, spacingDict } from "../styles/globalStyles";
import useKeyboardHeight from "../hooks/useKeyboardHeight";

type ModalContextType = {
  close: () => void;
}

const ModalContext = createContext<ModalContextType>({
  close: () => {
    throw new Error("ModalContext usado fora de BaseModal");
  }
});

export const ModalContextConsumer = ModalContext.Consumer;

const BaseModal: ModalComponent = ({ onClose, children }) => {
  const { flushModal } = useModal();

  const close = useCallback(() => {
    onClose ? onClose() : flushModal();
  }, [onClose]);

  const keyboardHeight = useKeyboardHeight();

  return (
    <ModalContext.Provider value={{ close }}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 5,
            padding: spacingDict.xl,
            backgroundColor: "rgba(85, 85, 85, 0.36)",
            paddingBottom: spacingDict.xl + keyboardHeight
          }
        ]}
      >

        <TouchableWithoutFeedback onPressOut={close}>
          <View style={[StyleSheet.absoluteFill]} />
        </TouchableWithoutFeedback>

        <View
          style={{
            backgroundColor: colorDict.white,
            padding: spacingDict.m,
            gap: spacingDict.s,
            borderRadius: borderRadiusDict.l,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 0 },
            elevation: 4,
            zIndex: 999
          }}
        >
          {children}
        </View>

      </View>
    </ModalContext.Provider>
  );
};

export default BaseModal;
