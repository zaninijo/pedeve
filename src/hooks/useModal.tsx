import { useState, useMemo, ReactNode, ComponentType, useCallback } from "react";

export default function useModal() {
  const [Modal, setModal] = useState<ReactNode>(null);

  const showModal = useCallback(<P extends object>(
    Modal: ComponentType<P & { onClose?: () => void }>,
    props?: P
  ) => {
    
    setModal(<Modal {...props} onClose={flushModal} />);
  }, []);

  function flushModal() {
    setModal(null);
  }

  return useMemo(
    () => ({
      Modal: Modal || null,
      showModal,
      flushModal
    }),
    [Modal, showModal, flushModal]
  );
}
