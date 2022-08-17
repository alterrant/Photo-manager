import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
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

        const authUserProfile: UserCredential = yield call(
            signInWithEmailAndPassword,
            auth,
            payload.email,
            payload.password,
        );

        const userProfile = getUserProfile(authUserProfile.user);

        yield put(logInSuccess(userProfile));
    } catch (e: any) {
        yield call(stopSubmit, 'signInForm', {
            _error: 'Invalid email or password',
            email: ' ',
            password: ' ',
        });
        yield put(loginError(e.code));
    }
}

function* OAuthLogInWorker({ payload }: PayloadAction<OAuthService>) {
    try {
        yield call(OAuthLogIn, payload);

        yield put(OAuthLoginSuccess);
    } catch (e: any) {
        yield put(OAuthLoginError);
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
