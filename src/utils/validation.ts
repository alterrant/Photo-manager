import { ERROR_MESSAGES } from '../constants/error-messages';

export const validators = {
  sizeValidator(fieldValue: string, size: number) {
    if (fieldValue?.length < size) {
      return ERROR_MESSAGES.incorrectLength;
    }
    return true;
  },
  passwordValidator(fieldValue: string) {
    return (
      /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?\d).{8,}$/.test(fieldValue) ||
      ERROR_MESSAGES.incorrectPassword
    );
  },
  emailValidator(fieldValue: string) {
    return /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,63}$/i.test(fieldValue) || ERROR_MESSAGES.invalidEmail;
  },
  retryPasswordValidation(fieldValue: string, password: string) {
    return fieldValue === password || ERROR_MESSAGES.PASSWORDS_MATCHING;
  },
};
