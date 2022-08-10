import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { EmailPass } from '../auth/types';

import { sendRegistrationRequest, registrationSuccess, registrationError } from '.';

function* signUpWorker({ payload }: PayloadAction<EmailPass>) {
    try {
        const auth = getAuth();

        yield call(createUserWithEmailAndPassword, auth, payload.email, payload.password);
        yield put(registrationSuccess());
    } catch (error: any) {
        if (error.errorCode === 'auth/email-already-in-use')
            put(registrationError('email already exist'));
        else if (error.errorCode === 'auth/invalid-email') put(registrationError('invalid email'));
        else put(registrationError(error.errorMessage));
    }
}

export function* registration(): Generator {
    yield takeLatest(sendRegistrationRequest.type, signUpWorker);
}
