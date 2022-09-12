import { RootState } from '../store';
import { AuthStateTypes } from '../store/auth';
import { PhotoStorageStateTypes } from '../store/photo-storage/types';
import { RegistrationStateTypes } from '../store/registration';
import { UpdateProfileStateTypes } from '../store/update-profile';

export const auth = (store: RootState): AuthStateTypes => store.auth;
export const photoStorage = (store: RootState): PhotoStorageStateTypes => store.photoStorage;
export const registration = (store: RootState): RegistrationStateTypes => store.registration;
export const updateProfile = (store: RootState): UpdateProfileStateTypes => store.updateProfile;
