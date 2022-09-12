import { INPUT_TYPES } from '../../../constants/input-constants';

import showPassword from './assets/eye.png';
import hidePassword from './assets/eye-hide.png';

export const inputTextStateValues = {
  type: INPUT_TYPES.TEXT,
  alt: 'Скрыть пароль',
  img: showPassword as string,
};

export const inputPasswordStateValues = {
  type: INPUT_TYPES.PASSWORD,
  alt: 'Показать пароль',
  img: hidePassword as string,
};
