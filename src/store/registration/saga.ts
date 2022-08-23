import { takeLatest, call, put } from 'redux-saga/effects';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes } from '@firebase/auth';

import { EmailPass } from '../auth/types';
import { sendRegistrationRequest, registrationSuccess, registrationError } from '.';

function* signUpWorker({ payload }: PayloadAction<EmailPass>) {
  try {
    const auth = getAuth();

    yield call(createUserWithEmailAndPassword, auth, payload.email, payload.password);
    yield put(registrationSuccess());
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS: {
          yield put(registrationError('email already exist'));
          break;
        }
        case AuthErrorCodes.ARGUMENT_ERROR: {
          yield put(registrationError('invalid email'));
          break;
        }
        case AuthErrorCodes.WEAK_PASSWORD: {
          yield put(registrationError('weak password'));
          break;
        }
        default:
          yield put(registrationError(error.code));
      }
    }
  }
}

export function* registration(): Generator {
  yield takeLatest(sendRegistrationRequest.type, signUpWorker);
}
