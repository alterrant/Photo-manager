import { call, put, select, takeLatest, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';

import { Unsubscribe } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import {
  addPhotoAttempt,
  addPhotoSuccess,
  addPhotoError,
  deletePhotoAttempt,
  deletePhotoSuccess,
  deletePhotoError,
  subscribeCommonPhotos,
  unsubscribeCommonPhotos,
  subscribeUserPhotos,
  unsubscribeUserPhotos,
} from '.';
import {
  AddUserPhotoType,
  DeleteUserPhotoType,
  FirestoreSubscribeTypes,
  PhotoStorageStateTypes,
} from './types';
import { getSnapshotPhotos, uploadTask } from './saga-helper';
import { projectFirestore, storage } from '../../firebase/config';
import { photoStorage } from '../../selectors';
import { DOC_PATH } from './constants';

function* addUserPhotoWorker({ payload }: PayloadAction<AddUserPhotoType>): Generator {
  try {
    yield call(uploadTask, payload);
    yield put(addPhotoSuccess());
  } catch (error) {
    if (error instanceof FirebaseError) yield put(addPhotoError(error.code));
  }
}

function* deletePhotoWorker({ payload }: PayloadAction<DeleteUserPhotoType>): Generator {
  const { userId, imageName, imageFirebaseId } = payload;

  try {
    const userPhotosReference = ref(storage, DOC_PATH.getUserPhotosStoragePath(userId)(imageName));
    // удаляем из fireStore
    yield call(deleteObject, userPhotosReference);
    // удаляем ссылку на файл из fireBase юзера и общих фотографий

    yield call(
      deleteDoc,
      doc(projectFirestore, DOC_PATH.getUserPhotosFirebasePath(userId), `${imageFirebaseId}`)
    );
    yield call(deleteDoc, doc(projectFirestore, DOC_PATH.getCommonPath(), `${imageFirebaseId}`));
    yield put(deletePhotoSuccess());
  } catch (error) {
    if (error instanceof FirebaseError) yield put(deletePhotoError(error.message));
  }
}

function* firestorePhotosWorker({
  payload,
}: PayloadAction<FirestoreSubscribeTypes>): Generator<StrictEffect> {
  const { path, setStatePhotos } = payload;
  const { isSubscribedUserPhotos, isSubscribedCommonPhotos } = (yield select(
    photoStorage
  )) as PhotoStorageStateTypes;

  const unsubscribe = (yield call(getSnapshotPhotos, {
    path,
    setStatePhotos,
  })) as Unsubscribe;

  if (path !== DOC_PATH.getCommonPath() && !isSubscribedUserPhotos) yield call(unsubscribe);
  if (path === DOC_PATH.getCommonPath() && !isSubscribedCommonPhotos) yield call(unsubscribe);
}

export function* photoStorageSaga(): Generator {
  yield takeLatest(addPhotoAttempt.type, addUserPhotoWorker);
  yield takeLatest(deletePhotoAttempt.type, deletePhotoWorker);
  yield takeLatest(subscribeCommonPhotos.type, firestorePhotosWorker);
  yield takeLatest(subscribeUserPhotos.type, firestorePhotosWorker);
  yield takeLatest(unsubscribeCommonPhotos.type, firestorePhotosWorker);
  yield takeLatest(unsubscribeUserPhotos.type, firestorePhotosWorker);
}
