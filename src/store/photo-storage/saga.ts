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
    } catch (e: any) {
        yield put(addPhotoError(e.message));
    }
}

function* deletePhotoWorker({ payload }: PayloadAction<DeleteUserPhotoType>): Generator {
    const { userId, imageName, imageFirebaseId } = payload;

    try {
        const userPhotosRef = ref(storage, DOC_PATH.getUserPhotosPath(userId)(imageName));
        // удаляем из fireStore
        yield call(deleteObject, userPhotosRef);
        // удаляем ссылку на файл из fireBase юзера и общих фотографий
        yield call(
            deleteDoc,
            doc(projectFirestore, DOC_PATH.getUserPath(userId), `${imageFirebaseId}`),
        );
        yield call(
            deleteDoc,
            doc(projectFirestore, DOC_PATH.getCommonPath(), `${imageFirebaseId}`),
        );
        yield put(deletePhotoSuccess());
    } catch (e: any) {
        yield put(deletePhotoError(e.message));
    }
}

function* firestorePhotosWorker({
    payload,
}: PayloadAction<FirestoreSubscribeTypes>): Generator<StrictEffect> {
    const { path, setStatePhotos } = payload;
    const { photos, isSubscribedUserPhotos, isSubscribedCommonPhotos } = (yield select(
        photoStorage,
    )) as PhotoStorageStateTypes;

    const unsubscribe = (yield call(getSnapshotPhotos, {
        path,
        photos,
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
