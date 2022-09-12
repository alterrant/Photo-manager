import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux';
import { Input } from '../../common/input';
import { registrationFormFieldsData } from './registration-form-fields-data';
import { Button } from '../../common/button';
import { registration } from '../../../selectors';
import { RegistrationRequestTypes } from '../../../store/registration/types';
import { sendRegistrationRequest, registrationErrorReset } from '../../../store/registration';
import { setFormError } from './registration-form-utils';

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
    if (errorMessage) setFormError(setError, errorMessage);
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
