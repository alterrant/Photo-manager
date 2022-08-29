import { ValidationRule } from 'react-hook-form';

import { INPUT_TYPES } from '../../../constants/input-constants';
import emailImg from '../../common/input/assets/email-svgrepo-com.svg';
import passwordImg from '../../common/input/assets/key-svgrepo-com.svg';
import { validators } from '../../../utils/validation';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

type LoginFormFieldsDataTypes = {
  name: 'email' | 'password';
  label: string;
  inputClass: string;
  labelClass: string;
  type: typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
  placeholder: string;
  img?: string;
  validationRules?: {
    required?: ValidationRule<boolean> | string;
    min?: ValidationRule<number | string>;
    max?: ValidationRule<number | string>;
    maxLength?: ValidationRule<number>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
    validate?: (value: string) => string | boolean;
  };
};

export const loginFormFieldsData: LoginFormFieldsDataTypes[] = [
  {
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    inputClass: 'auth-input',
    name: 'email',
    labelClass: 'auth-input-label',
    img: emailImg as string,
    validationRules: {
      required: ERROR_MESSAGES.require,
      minLength: {
        value: 4,
        message: ERROR_MESSAGES.incorrectLength,
      },
      validate: (value: string) => validators.emailValidator(value),
    },
  },
  {
    type: 'password',
    name: 'password',
    inputClass: 'auth-input',
    placeholder: 'Password',
    label: 'Password',
    labelClass: 'auth-input-label',
    img: passwordImg as string,
    validationRules: {
      required: ERROR_MESSAGES.require,
      minLength: {
        value: 8,
        message: ERROR_MESSAGES.incorrectLength,
      },
      validate: (value: string) => validators.passwordValidator(value),
    },
  },
];
