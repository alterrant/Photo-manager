import { call, put, select, takeLatest, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { deleteObject, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';

import { Unsubscribe } from '@firebase/firestore';
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
    PhotoStorageStateTypes,
} from '.';
import { AddUserPhotoType, DeleteUserPhotoType } from './types';
import { getSnapshotPhotos, uploadTask } from './saga-helper';
import { projectFirestore, storage } from '../../firebase/config';
import { photoStorage } from '../../selectors';

function* addUserPhotoWorker({ payload }: PayloadAction<AddUserPhotoType>): Generator {
    try {
        yield call(uploadTask, payload);
        yield put(addPhotoSuccess());
    } catch (e: any) {
        yield put(addPhotoError(e.errorMessage));
    }
}

function* deletePhotoWorker({ payload }: PayloadAction<DeleteUserPhotoType>): Generator {
    const { userId, imageName, imageFirebaseId } = payload;

    try {
        const userPhotosRef = ref(storage, `user_${userId}/${imageName}`);
        // удаляем из fireStore
        yield call(deleteObject, userPhotosRef);
        // удаляем ссылку на файл из fireBase юзера
        yield call(deleteDoc, doc(projectFirestore, `user_${userId}`, `${imageFirebaseId}`));
        yield put(deletePhotoSuccess());
    } catch (e: any) {
        yield put(deletePhotoError(e.message));
    }
}

function* firestorePhotosWorker({ payload }: PayloadAction<any>): Generator<StrictEffect> {
    const { path, setStatePhotos } = payload;
    const { photos, isSubscribedUserPhotos, isSubscribedCommonPhotos } = (yield select(
        photoStorage,
    )) as PhotoStorageStateTypes;

    const unsubscribe = (yield call(getSnapshotPhotos, {
        path,
        photos,
        setStatePhotos,
    })) as Unsubscribe;

    if (path !== 'common_photos' && !isSubscribedUserPhotos) yield call(unsubscribe);
    if (path === 'common_photos' && !isSubscribedCommonPhotos) yield call(unsubscribe);
}

export function* photoStorageSaga(): Generator {
    yield takeLatest(addPhotoAttempt.type, addUserPhotoWorker);
    yield takeLatest(deletePhotoAttempt.type, deletePhotoWorker);
    yield takeLatest(subscribeCommonPhotos.type, firestorePhotosWorker);
    yield takeLatest(subscribeUserPhotos.type, firestorePhotosWorker);
    yield takeLatest(unsubscribeCommonPhotos.type, firestorePhotosWorker);
    yield takeLatest(unsubscribeUserPhotos.type, firestorePhotosWorker);
}
