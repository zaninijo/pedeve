import { useState, useMemo, ReactNode, ComponentType, useCallback } from "react";

export default function useModal() {
  const [modal, setModal] = useState<ReactNode>(null);

  const showModal = useCallback(<P extends object = {}>(
    Modal: ComponentType<P>,
    props: P
  ) => {
    
    setModal(<Modal {...(props as P)} onClose={() => setModal(null)} />);
  }, []);

  function flushModal() {
    setModal(null);
  }

  return useMemo(
    () => ({
      modal,
      showModal,
      flushModal
    }),
    [modal, showModal, flushModal]
  );
}
