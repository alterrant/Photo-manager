import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from '@firebase/util';
import { updateProfileAttempt, updateProfileSuccess, updateProfileError } from '.';
import { updateUserProfile } from './saga-hepler';
import { NewProfileDataTypes } from './types';

function* updateProfileWorker({ payload }: PayloadAction<NewProfileDataTypes>): Generator {
  try {
    // TODO: проверить раздельный вызов команд обновления номера и профиля
    yield call(updateUserProfile, payload);
    yield put(updateProfileSuccess());
  } catch (error) {
    if (error instanceof FirebaseError) yield put(updateProfileError(error.code));
  }
}

export function* updateProfileSaga(): Generator {
  yield takeLatest(updateProfileAttempt.type, updateProfileWorker);
}
