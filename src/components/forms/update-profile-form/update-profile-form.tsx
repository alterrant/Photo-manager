import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux';
import { Input } from '../../common/input';
import { updateProfileFormFieldsData } from './update-profile-form-fields-data';
import { Button } from '../../common/button';
import { auth, updateProfile } from '../../../selectors';
import { updateProfileAttempt, resetUpdateProfileState } from '../../../store/update-profile';
import { NewProfileDataTypes } from '../../../store/update-profile/types';
import { PhotoLoader } from '../../photo-loader';
import { ProfileAvatar } from '../../profile-avatar';
import { projectFirestore } from '../../../firebase/config';
import { DOC_PATH } from '../../../store/photo-storage/constants';
import { SnapshotPhotosData } from '../../../store/photo-storage/types';
import { setFormErrors } from './update-form-utils';

import './update-profile-form.css';

export const UpdateProfileForm = () => {
  const dispatch = useAppDispatch();
  const { authUserProfile } = useAppSelector(auth);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const methods = useForm<NewProfileDataTypes>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { isLoading, errorMessage, isSuccess } = useAppSelector(updateProfile);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const onSubmit: SubmitHandler<NewProfileDataTypes> = ({ displayName, photoURL = avatarUrl }) => {
    dispatch(
      updateProfileAttempt({
        displayName,
        photoURL,
      })
    );
  };

  useEffect(() => {
    if (errorMessage) setFormErrors(setError, errorMessage);
    // TODO: изменить эффекты на нужные
  }, [setError, errorMessage, isSubmitting]);

  useEffect(() => {
    return onSnapshot(
      doc(projectFirestore, DOC_PATH.getUserPath(authUserProfile.uid), 'profileAvatar'),
      querySnapshot => {
        if (querySnapshot.data()) {
          const { imageUrl } = querySnapshot.data() as SnapshotPhotosData;

          setAvatarUrl(imageUrl);
        }
      }
    );
  }, [authUserProfile.uid]);

  useEffect(() => {
    return () => {
      dispatch(resetUpdateProfileState());
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

        <div className="profile-avatar-container">
          <PhotoLoader destination="profileAvatar">
            <ProfileAvatar avatarModifier="pencil" />
          </PhotoLoader>
        </div>

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
