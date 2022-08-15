import { call, put, takeLatest } from 'redux-saga/effects';
import { FirestoreError } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { stopSubmit } from 'redux-form';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
    AuthUserProfileTypes,
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

        const authUserProfile: AuthUserProfileTypes = yield call(
            signInWithEmailAndPassword,
            auth,
            payload.email,
            payload.password,
        );

        yield put(logInSuccess(authUserProfile));
    } catch (e: unknown) {
        if (e instanceof FirestoreError) {
            yield call(stopSubmit, 'signInForm', {
                _error: 'Invalid email or password',
                email: ' ',
                password: ' ',
            });
            yield put(loginError(e.message));
        }
    }
}

function* OAuthLogInWorker({ payload }: PayloadAction<OAuthService>) {
    try {
        yield call(OAuthLogIn, payload);

        yield put(OAuthLoginSuccess);
    } catch (e: unknown) {
        if (e instanceof FirestoreError) {
            yield put(OAuthLoginError);
        }
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
