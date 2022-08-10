import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { onSnapshot, addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { StorageError, UploadTaskSnapshot } from '@firebase/storage';
import { projectFirestore, storage } from '../../firebase/config';
import { AddUserPhotoType, SetCommonPhotoType } from './types';

export const uploadTask = (payload: AddUserPhotoType) => {
    const { userId, file, setProgress, setError, setUrl } = payload;

    const storageRef = ref(storage, `user_${userId}`);
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
            collection(projectFirestore, `user_${userId}`),
            dataFile,
        );
        const imageUserFirebaseId = userPhotoCollection.id;
        // записываем в общие фото
        setDoc(doc(projectFirestore, `common_photos`, imageUserFirebaseId), dataFile);
    };

    const error = (err: StorageError) => {
        // проверяем на ошибки при записи
        setError(err.message);
    };

    uploadBytesResumable(storageNewRef, file).on('state_changed', next, error, complete);
};

const serializePhotos = (nonSerializedPhotos: any) => {
    return [...nonSerializedPhotos].map((item) => {
        return { ...item, addedTime: { ...item.addedTime } };
    });
};

const sortPhotos = (photos: any) =>
    photos.sort((a: any, b: any) => b.addedTime.seconds - a.addedTime.seconds);

const sortAndSerializePhotos = (unsortedPhotos: any) => {
    const serializedPhotos = serializePhotos(unsortedPhotos);
    return sortPhotos(serializedPhotos);
};

type GetSnapshotPhotos = {
    path: string;
    photos: Record<string, string>[];
    setStatePhotos: SetCommonPhotoType;
};

export const getSnapshotPhotos = ({ path, photos, setStatePhotos }: GetSnapshotPhotos) => {
    const snapshotPhotos: any = [];

    return onSnapshot(collection(projectFirestore, path), (querySnapshot) => {
        querySnapshot.forEach((item) => {
            snapshotPhotos.push({ id: item.id, ...item.data() });
        });

        const isEqualPhotos = snapshotPhotos.length === photos.length;
        if (!isEqualPhotos) setStatePhotos(sortAndSerializePhotos(snapshotPhotos));
    });
};
