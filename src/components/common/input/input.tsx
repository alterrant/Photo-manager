import { useState } from 'react';
import { useFormContext, useWatch, ValidationRule } from 'react-hook-form';
import classNames from 'classnames';

import { INPUT_TYPES } from '../../../constants/input-constants';
import { inputPasswordStateValues, inputTextStateValues } from './input-state-values';
import { validators } from '../../../utils/validation';
import { ErrorMessage } from '../error-message';

import './input.css';

type ValidationRulesTypes = {
  required?: ValidationRule<boolean> | string;
  min?: ValidationRule<number | string>;
  max?: ValidationRule<number | string>;
  maxLength?: ValidationRule<number>;
  minLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: string) => string | boolean;
};

type InputTypes = {
  type: typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
  inputClass: string;
  placeholder: string;
  name: string;
  label: string;
  labelClass: string;

  onFocus?: () => void;
  required?: boolean;
  defaultValue?: string | number;
  errorMessage?: string;
  img?: string;
  isDirtyField?: boolean;
  helpText?: string;
  validationRules?: ValidationRulesTypes;
};

export const Input = ({
  type,
  defaultValue,
  inputClass,
  placeholder,
  name,
  label,
  labelClass,
  img,
  required,
  errorMessage,
  onFocus,
  helpText,
  validationRules,
}: InputTypes) => {
  const { register } = useFormContext();
  const controlField = useWatch({ name: 'password' }) as string;

  const [inputTypePassword, toggleInputTypePassword] = useState(
    inputPasswordStateValues as Record<string, string>
  );
  const [inputType, toggleInputType] = useState(type);

  const inputTypeHandler = () => {
    if (inputTypePassword.type === INPUT_TYPES.PASSWORD) {
      toggleInputTypePassword(inputTextStateValues);
      toggleInputType(INPUT_TYPES.TEXT);
    } else {
      toggleInputTypePassword(inputPasswordStateValues);
      toggleInputType(INPUT_TYPES.PASSWORD);
    }
  };

  const inputClassConstructor = classNames(inputClass, 'inputDefault', {
    inputError: errorMessage,
    passwordPadding: type === INPUT_TYPES.PASSWORD,
    imagePadding: img,
  });

  const withWatchValidation = () => {
    if (validationRules && name === 'retryPassword') {
      return {
        ...validationRules,
        validate: (fieldValue: string) =>
          validationRules.validate!(fieldValue) &&
          validators.retryPasswordValidation(fieldValue, controlField),
      };
    }
    return validationRules;
  };

  return (
    <>
      <label className={labelClass}>
        <div className="labelText">
          {label} {required && ' *'}
        </div>
        <div className="inputWrapper">
          <input
            type={inputType}
            defaultValue={defaultValue}
            className={inputClassConstructor}
            placeholder={placeholder}
            onFocus={onFocus}
            {...register(name, withWatchValidation())}
          />
          {img && <img className="imgInputStyle" src={img} alt={label} width={24} height={24} />}
          {type === INPUT_TYPES.PASSWORD && (
            <div className="hidePassword button" onClick={inputTypeHandler}>
              <img src={inputTypePassword.img} alt="hide password img" />
            </div>
          )}
        </div>
      </label>
      {!errorMessage && helpText && <span>{helpText}</span>}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </>
  );
};
