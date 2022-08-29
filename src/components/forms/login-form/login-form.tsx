import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { AuthErrorCodes } from '@firebase/auth';
import { EmailPass } from '../../../store/auth/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logInAttempt, OAuthLoginAttempt, loginErrorReset } from '../../../store/auth';
import { Input } from '../../common/input';
import { loginFormFieldsData } from './login-form-fields-data';
import { Button } from '../../common/button';
import { auth } from '../../../selectors';
import { INPUT_TYPES } from '../../../constants/input-constants';
import { ERROR_MESSAGES } from '../../../constants/error-messages';
import gitHub from '../../assets/svg/git-hub.svg';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const methods = useForm<EmailPass>({ mode: 'onTouched', reValidateMode: 'onChange' });
  const { isLoading, errorMessage } = useAppSelector(auth);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const onSubmit: SubmitHandler<EmailPass> = ({ email, password }) => {
    dispatch(logInAttempt({ email, password }));
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
    }
  }, [setError, errorMessage, isSubmitting]);

  useEffect(() => {
    return () => {
      dispatch(loginErrorReset());
      clearErrors();
    };
  }, [dispatch, clearErrors, location]);

  return (
    <FormProvider {...methods}>
      <form className="auth-form-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="auth-form-title">Sign In With</span>

        <div className="login-button-wrapper">
          <Button
            classButton="auth-github login-button"
            disabled={false}
            type="button"
            onClick={() => dispatch(OAuthLoginAttempt('gitHub'))}
            buttonText="GitHub"
            src={gitHub as string}
            classImg="GitHubSVG"
          />
          <Button
            classButton="auth-google login-button"
            disabled={false}
            type="button"
            onClick={() => dispatch(OAuthLoginAttempt('google'))}
            buttonText="Google"
          />
        </div>

        {loginFormFieldsData.map(fieldData => (
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
            buttonText="Sign In"
            disabled={isLoading}
          />
        </div>

        <div className="auth-signUp">
          <p>
            Not a member?{' '}
            <motion.span
              className="auth-text-link"
              onClick={() => navigate('/registration')}
              whileHover={{ color: 'rgb(78,65,113)' }}
            >
              Sign up now
            </motion.span>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};
