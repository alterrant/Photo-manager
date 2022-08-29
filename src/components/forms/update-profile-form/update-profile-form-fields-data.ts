import { ValidationRule } from 'react-hook-form';

import { INPUT_TYPES } from '../../../constants/input-constants';
import emailImg from '../../common/input/assets/email-svgrepo-com.svg';
// import { validators } from '../../../utils/validation';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

type LoginFormFieldsDataTypes = {
  name: 'displayName' | 'photoURL';
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

export const updateProfileFormFieldsData: LoginFormFieldsDataTypes[] = [
  {
    type: 'text',
    placeholder: 'Login',
    label: 'Login',
    inputClass: 'auth-input',
    name: 'displayName',
    labelClass: 'auth-input-label',
    img: emailImg as string,
    validationRules: {
      required: ERROR_MESSAGES.require,
      minLength: {
        value: 4,
        message: ERROR_MESSAGES.incorrectLength,
      },
    },
  },
  /* {
    type: 'text',
    placeholder: 'Phone number',
    label: 'Phone number',
    inputClass: 'auth-input',
    name: 'phoneNumber',
    labelClass: 'auth-input-label',
    img: emailImg as string,
    validationRules: {
      required: ERROR_MESSAGES.require,
      minLength: {
        value: 9,
        message: ERROR_MESSAGES.incorrectLength,
      },
    },
  }, */
  /* {
    type: 'file',
    placeholder: 'Profile image',
    label: 'Profile image',
    inputClass: 'auth-input',
    name: 'photoURL',
    labelClass: 'auth-input-label',
    img: emailImg as string,
  }, */
];
