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
    } catch (e: any) {
        if (e.code === 'already-exists') put(registrationError('email already exist'));
        else if (e.code === 'invalid-argument') put(registrationError('invalid email'));
        else put(registrationError(e.message));
    }
}

export function* registration(): Generator {
    yield takeLatest(sendRegistrationRequest.type, signUpWorker);
}
