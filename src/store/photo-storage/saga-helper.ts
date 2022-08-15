import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FirestoreError } from '@firebase/firestore';
import { onSnapshot, addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { UploadTaskSnapshot } from '@firebase/storage';
import { projectFirestore, storage } from '../../firebase/config';
import { AddUserPhotoType, FirestoreSubscribeTypes, PhotoType, SnapshotPhotos } from './types';
import { DOC_CHANGES_PHOTO_TYPES, DOC_PATH, STATE_CHANGED } from './constants';

export const uploadTask = (payload: AddUserPhotoType) => {
    const { userId, file, setProgress, setError, setUrl } = payload;

    const storageRef = ref(storage, DOC_PATH.getUserPath(userId));
    const storageNewRef = ref(storageRef, file.name);
    const timestamp = serverTimestamp();

    const next = (snap: UploadTaskSnapshot) => {
        // записываем фото в fireStore
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;

        setProgress(progress);
    };

    const complete = async () => {
        // выполняем при завершении
        const url = await getDownloadURL(storageNewRef);

        setUrl(url);
        // запись свойств файла и url в fireDataBase
        const dataFile = {
            addedTime: timestamp,
            name: file.name,
            imageUrl: url,
        };
        // записываем в профиль пользователя и запоминаем автосгенерированное id коллекции
        const userPhotoCollection = await addDoc(
            collection(projectFirestore, DOC_PATH.getUserPath(userId)),
            dataFile,
        );
        const imageUserFirebaseId = userPhotoCollection.id;
        // записываем в общие фото
        setDoc(doc(projectFirestore, DOC_PATH.getCommonPath(), imageUserFirebaseId), dataFile);
    };

    const error = (e: unknown) => {
        // проверяем на ошибки при записи
        if (e instanceof FirestoreError) setError(e.message);
    };

    uploadBytesResumable(storageNewRef, file).on(STATE_CHANGED, next, error, complete);
};

const serializePhotos = (nonSerializedPhotos: SnapshotPhotos[]) => {
    return [...nonSerializedPhotos].map((item) => {
        return { ...item, addedTime: { ...item.addedTime } };
    });
};

const sortPhotos = (photos: SnapshotPhotos[]) =>
    photos.sort((a, b) => b.addedTime.seconds - a.addedTime.seconds);

const sortAndSerializePhotos = (unsortedPhotos: SnapshotPhotos[]) => {
    const serializedPhotos = serializePhotos(unsortedPhotos);
    return sortPhotos(serializedPhotos);
};

type GetSnapshotPhotos = {
    photos: PhotoType;
} & FirestoreSubscribeTypes;

export const getSnapshotPhotos = ({ path, photos, setStatePhotos }: GetSnapshotPhotos) => {
    const snapshotPhotos: SnapshotPhotos[] = [];

    return onSnapshot(collection(projectFirestore, path), (querySnapshot) => {
        const docChanges = querySnapshot.docChanges();

        docChanges.forEach((changedPhoto) => {
            if (changedPhoto.type === DOC_CHANGES_PHOTO_TYPES.ADDED) {
                const { imageUrl, name, addedTime } = changedPhoto.doc.data();
                const photo: SnapshotPhotos = {
                    id: changedPhoto.doc.id,
                    imageUrl,
                    name,
                    addedTime,
                };

                snapshotPhotos.push(photo);
            }
            if (changedPhoto.type === DOC_CHANGES_PHOTO_TYPES.REMOVED) {
                const photoIndex = snapshotPhotos.findIndex(
                    (photo) => changedPhoto.doc.id === photo.id,
                );

                snapshotPhotos.splice(photoIndex, 1);
            }
        });

        const isEqualPhotos = snapshotPhotos.length === photos.length;
        if (!isEqualPhotos) setStatePhotos(sortAndSerializePhotos(snapshotPhotos));
    });
};
