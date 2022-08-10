import { RootState } from '../store';
import { AuthStateTypes } from '../store/auth';
import { PhotoStorageStateTypes } from '../store/photo-storage';

export const auth = (store: RootState): AuthStateTypes => store.auth;
export const form = (store: RootState) => store.form;
export const photoStorage = (store: RootState): PhotoStorageStateTypes => store.photoStorage;
// export const initialiseApp = (store: RootState) => store.initialiseApp;
