import { AuthErrorCodes } from '@firebase/auth';
import { UseFormSetError } from 'react-hook-form/dist/types/form';
import { INPUT_FIELDS_NAMES } from '../../../constants/input-constants';
import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { NewProfileDataTypes } from '../../../store/update-profile/types';

export const setFormErrors = (
  setError: UseFormSetError<NewProfileDataTypes>,
  errorMessage: string
) => {
  switch (errorMessage) {
    case AuthErrorCodes.USER_DELETED: {
      setError(INPUT_FIELDS_NAMES.DISPLAY_NAME, { message: ERROR_MESSAGES.USER_NOT_FOUNDED });
      break;
    }
    case AuthErrorCodes.USER_DISABLED: {
      setError(INPUT_FIELDS_NAMES.PHOTO_URL, { message: ERROR_MESSAGES.BANNED });
      break;
    }
    default: {
      setError(INPUT_FIELDS_NAMES.DISPLAY_NAME, { message: errorMessage });
      setError(INPUT_FIELDS_NAMES.PHOTO_URL, { message: errorMessage });
      break;
    }
  }
};
