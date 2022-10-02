import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Preloader } from '../preloader';
import { BUTTON_TYPES } from '../../../constants/button-constants';

import './button-style.css';

type ButtonType = {
  type?: 'button' | 'submit' | 'reset';
  buttonText?: string | ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  classButton?: string;
  classText?: string;
  classImg?: string;
  src?: string;
  loading?: boolean;
  children?: ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
      buttonText,
      disabled = false,
      onClick,
      type = BUTTON_TYPES.BUTTON,
      classText,
      classButton,
      classImg,
      src,
      loading,
      children,
    },
    ref
  ) => {
    const buttonStyle = classNames(classButton, 'button');

    return (
      <button ref={ref} className={buttonStyle} disabled={disabled} onClick={onClick} type={type}>
        {loading ? (
          <Preloader />
        ) : (
          <>
            {buttonText && <span className={classText}>{buttonText}</span>}
            {src && <img className={classImg} src={src} alt="img" />}
            {children}
          </>
        )}
      </button>
    );
  }
);
