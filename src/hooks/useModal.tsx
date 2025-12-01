import { createContext, useContext, useState, ReactNode, ComponentType, useCallback, useMemo } from "react";

type ModalContextType = {
  Modal: ReactNode;
  showModal: <P extends object>(modal: ComponentType<P & { onClose?: () => void }>, props?: P) => void;
  flushModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  Modal: null,
  showModal: () => {},
  flushModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [Modal, setModal] = useState<ReactNode>(null);

  const flushModal = useCallback(() => {
    setModal(null);
  }, []);

  const showModal = useCallback(<P extends object>(
    ModalComponent: ComponentType<P & { onClose?: () => void }>,
    props?: P
  ) => {
    setModal(<ModalComponent {...props} onClose={flushModal} />);
  }, [flushModal]);

  const value = useMemo(
    () => ({
      Modal,
      showModal,
      flushModal,
    }),
    [Modal, showModal, flushModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

export default function useModal() {
  return useContext(ModalContext);
}
