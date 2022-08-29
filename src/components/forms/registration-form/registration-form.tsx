import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { AuthErrorCodes } from '@firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Input } from '../../common/input';
import { registrationFormFieldsData } from './registration-form-fields-data';
import { Button } from '../../common/button';
import { registration } from '../../../selectors';
import { INPUT_TYPES } from '../../../constants/input-constants';
import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RegistrationRequestTypes } from '../../../store/registration/types';
import { sendRegistrationRequest, registrationErrorReset } from '../../../store/registration';

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const methods = useForm<RegistrationRequestTypes & { retryPassword: string }>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { isLoading, errorMessage, isSuccess } = useAppSelector(registration);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const onSubmit: SubmitHandler<RegistrationRequestTypes> = ({ email, password }) => {
    dispatch(sendRegistrationRequest({ email, password }));
  };

  useEffect(() => {
    if (errorMessage) {
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
        case AuthErrorCodes.INVALID_EMAIL: {
          setError(INPUT_TYPES.EMAIL, { message: ERROR_MESSAGES.INVALID_EMAIL });
          break;
        }
        case AuthErrorCodes.INVALID_PASSWORD: {
          setError(INPUT_TYPES.PASSWORD, { message: ERROR_MESSAGES.INVALID_PASSWORD });
          break;
        }
        default: {
          setError(INPUT_TYPES.PASSWORD, { message: errorMessage });
          setError(INPUT_TYPES.EMAIL, { message: errorMessage });
          break;
        }
      }
    }
    // TODO: написать ошибки для регистрации
  }, [setError, errorMessage, isSubmitting]);

  useEffect(() => {
    return () => {
      dispatch(registrationErrorReset());
      clearErrors();
    };
  }, [dispatch, clearErrors, location]);

  useEffect(() => {
    if (isSuccess) navigate('/update-profile');
  }, [navigate, isSuccess]);
  // TODO: проверку емейла и логина после блюра, а не после сабмита
  return (
    <FormProvider {...methods}>
      <form className="auth-form-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="auth-form-title">Sign up</span>

        {registrationFormFieldsData.map(fieldData => (
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
            buttonText="Sign Up"
            disabled={isLoading}
          />
        </div>

        <div className="auth-signUp">
          <p>
            If a member,{' '}
            <motion.span
              className="auth-text-link"
              onClick={() => navigate('/auth')}
              whileHover={{ color: 'rgb(78,65,113)' }}
            >
              sign in
            </motion.span>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};
