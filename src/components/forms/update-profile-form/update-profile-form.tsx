import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { AuthErrorCodes } from '@firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginErrorReset } from '../../../store/auth';
import { Input } from '../../common/input';
import { updateProfileFormFieldsData } from './update-profile-form-fields-data';
import { Button } from '../../common/button';
import { updateProfile } from '../../../selectors';
import { INPUT_FIELDS_NAMES } from '../../../constants/input-constants';
import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { updateProfileAttempt } from '../../../store/update-profile';
import { NewProfileDataTypes } from '../../../store/update-profile/types';

export const UpdateProfileForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const methods = useForm<NewProfileDataTypes>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { isLoading, errorMessage, isSuccess } = useAppSelector(updateProfile);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const onSubmit: SubmitHandler<NewProfileDataTypes> = ({ displayName, photoURL }) => {
    dispatch(
      updateProfileAttempt({
        displayName,
        /* photoURL, */
      })
    );
  };

  useEffect(() => {
    if (errorMessage) {
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
    }
    // TODO: изменить эффекты на нужные
  }, [setError, errorMessage, isSubmitting]);

  useEffect(() => {
    return () => {
      dispatch(loginErrorReset());
      clearErrors();
    };
  }, [dispatch, clearErrors, location]);

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [navigate, isSuccess]);
  // TODO: проверку емейла и логина после блюра, а не после сабмита
  return (
    <FormProvider {...methods}>
      <form className="auth-form-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="auth-form-title">Update profile</span>

        {updateProfileFormFieldsData.map(fieldData => (
          <Input
            {...fieldData}
            errorMessage={errors[fieldData.name]?.message}
            key={fieldData.name}
          />
        ))}

        <div className="auth-submit-container">
          <Button
            classButton="auth-submit-button"
            type="submit"
            buttonText="Create account"
            disabled={isLoading}
          />
        </div>

        <div className="auth-signUp">
          <motion.span
            className="auth-text-link"
            onClick={() => navigate('/')}
            whileHover={{ color: 'rgb(78,65,113)' }}
          >
            Complete profile later
          </motion.span>
        </div>
      </form>
    </FormProvider>
  );
};
