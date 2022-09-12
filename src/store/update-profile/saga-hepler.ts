import { getAuth, updateProfile } from 'firebase/auth';

import { NewProfileDataTypes } from './types';

export const updateUserProfile = async (newProfileData: NewProfileDataTypes) => {
  const auth = getAuth();

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, newProfileData);
  }
};
