import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from '@firebase/util';
import { stopSubmit } from 'redux-form';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { UserCredential } from '@firebase/auth';
import { getUserProfile } from '../../utils/auth';
import {
  logInAttempt,
  logInSuccess,
  loginError,
  OAuthLoginAttempt,
  OAuthLoginSuccess,
  OAuthLoginError,
  logOut,
} from '.';
import { OAuthLogIn } from './saga-helper';
import { EmailPass, OAuthService } from './types';

function* logInWorker({ payload }: PayloadAction<EmailPass>) {
  try {
    const auth = getAuth();

    const authUserProfile = (yield call(
      signInWithEmailAndPassword,
      auth,
      payload.email,
      payload.password
    )) as UserCredential;

    const userProfile = getUserProfile(authUserProfile.user);

    yield put(logInSuccess(userProfile));
  } catch (error) {
    yield call(stopSubmit, 'signInForm', {
      _error: 'Invalid email or password',
      email: ' ',
      password: ' ',
    });
    if (error instanceof FirebaseError) yield put(loginError(error.code));
  }
}

function* OAuthLogInWorker({ payload }: PayloadAction<OAuthService>) {
  try {
    yield call(OAuthLogIn, payload);

    yield put(OAuthLoginSuccess);
  } catch (error) {
    if (error instanceof Error) yield put(OAuthLoginError(error.message));
    else if (error instanceof FirebaseError) yield put(OAuthLoginError(error.code));
  }
}

function* logOutWorker() {
  const auth = getAuth();

  yield call(signOut, auth);
}

export function* authSaga(): Generator {
  yield takeLatest(logInAttempt.type, logInWorker);
  yield takeLatest(OAuthLoginAttempt.type, OAuthLogInWorker);
  yield takeLatest(logOut.type, logOutWorker);
}
