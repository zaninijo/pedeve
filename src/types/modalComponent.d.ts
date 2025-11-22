import { ComponentType, ReactNode } from 'react';

type ModalProps = {
  onClose: () => any,
  children?: ReactNode
}

export type ModalComponent<P = {}> = ComponentType<P & ModalProps>;
