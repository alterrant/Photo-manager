import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { stopSubmit } from 'redux-form';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthUserProfileTypes, logInAttempt, logInSuccess, loginError, logOut } from '.';
import { EmailPass } from './types';

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
    } catch (e: any) {
        yield call(stopSubmit, 'signInForm', {
            _error: 'Invalid email or password',
            email: ' ',
            password: ' ',
        });
        yield put(loginError(e.errorMessage));
    }
}

function* logOutWorker() {
    const auth = getAuth();

    yield call(signOut, auth);
}

export function* authSaga(): Generator {
    yield takeLatest(logInAttempt.type, logInWorker);
    yield takeLatest(logOut.type, logOutWorker);
}
