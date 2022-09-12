import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { registrationReducer } from './registration';
import { photoStorageReducer } from './photo-storage';
import { updateProfileReducer } from './update-profile';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  auth: authReducer,
  registration: registrationReducer,
  photoStorage: photoStorageReducer,
  updateProfile: updateProfileReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
