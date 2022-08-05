import { configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import initialiseAppReducer from './initialise-app';
import photoStorageReducer from './photo-storage';

const rootReducer = {
    initialiseApp: initialiseAppReducer,
    auth: authReducer,
    photoStorage: photoStorageReducer,
    form: formReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
