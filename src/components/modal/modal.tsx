import { ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Button } from '../common/button';
import close from './assets/close-svgrepo-com.svg';
import { BUTTON_TYPES } from '../../constants/button-constants';

import './modal.css';

type ModalTypes = {
  className?: string;
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ children, isOpened, onClose, className }: ModalTypes) => {
  const modalNode = useRef(document.createElement('div')).current;

  modalNode.className = classNames('modal', className);

  useEffect(() => {
    if (isOpened) {
      document.body.append(modalNode);

      document.body.style.overflowY = 'hidden';

      return () => {
        document.body.removeChild(modalNode);
        document.body.style.overflowY = 'scroll';
      };
    }
  });

  return createPortal(
    <>
      {children}
      <Button
        type={BUTTON_TYPES.BUTTON}
        src={close as string}
        classImg="modal__close"
        onClick={onClose}
      />
    </>,
    modalNode
  );
};
