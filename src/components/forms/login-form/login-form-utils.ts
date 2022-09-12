import { AuthErrorCodes } from '@firebase/auth';
import { UseFormSetError } from 'react-hook-form/dist/types/form';
import { INPUT_TYPES } from '../../../constants/input-constants';
import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { EmailPass } from '../../../store/auth/types';

export const setFormError = (setError: UseFormSetError<EmailPass>, errorMessage: string) => {
  switch (errorMessage) {
    case AuthErrorCodes.USER_DELETED: {
      setError(INPUT_TYPES.EMAIL, { message: ERROR_MESSAGES.USER_NOT_FOUNDED });
      break;
    }
    case AuthErrorCodes.USER_DISABLED: {
      setError(INPUT_TYPES.EMAIL, { message: ERROR_MESSAGES.BANNED });
      break;
    }
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER: {
      setError(INPUT_TYPES.EMAIL, { message: ERROR_MESSAGES.USER_NOT_FOUNDED });
      break;
    }
    case AuthErrorCodes.INVALID_PASSWORD: {
      setError(INPUT_TYPES.PASSWORD, { message: ERROR_MESSAGES.INVALID_PASSWORD });
      break;
    }
    case AuthErrorCodes.INVALID_EMAIL: {
      setError(INPUT_TYPES.PASSWORD, { message: ERROR_MESSAGES.INVALID_EMAIL });
      break;
    }
    default: {
      setError(INPUT_TYPES.PASSWORD, { message: errorMessage });
      setError(INPUT_TYPES.EMAIL, { message: errorMessage });
      break;
    }
  }
};
