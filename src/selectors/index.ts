import { RootState } from '../store';

export const auth = (store: RootState) => store.auth;
export const form = (store: RootState) => store.form;
export const photoStorage = (store: RootState) => store.photoStorage;
export const initialiseApp = (store: RootState) => store.initialiseApp;
