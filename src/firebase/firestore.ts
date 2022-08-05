import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { projectFirestore, storage } from './config';

type AddUserPhotoType = {
    userId: string | number;
    file: any;
    setProgress: any;
    setError: any;
    setUrl: any;
};

export const addUserPhoto = ({ userId, file, setProgress, setError, setUrl }: AddUserPhotoType) => {
    const storageRef = ref(storage, `user_${userId}`);
    const storageNewRef = ref(storageRef, file.name);
    const timestamp = serverTimestamp();

    uploadBytesResumable(storageNewRef, file).on(
        'state_changed',
        (snap) => {
            // записываем фото в fireStore
            const progress = (snap.bytesTransferred / snap.totalBytes) * 100;

            setProgress(progress);
            // проверяем на ошибки при записи
        },
        (err) => {
            setError(err);
            // выполняем при завершении
        },
        async () => {
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
            await setDoc(doc(projectFirestore, `common_photos`, imageUserFirebaseId), dataFile);
        },
    );
    return 'newPhotoAdded';
};

type DeleteUserPhotoType = {
    userId: string | number;
    imageName: string;
    imageFirebaseId: string | number;
};

const deleteUserPhoto = ({ userId, imageName, imageFirebaseId }: DeleteUserPhotoType) => {
    const userPhotosRef = ref(storage, `user_${userId}/${imageName}`);
    // удаляем из fireStore
    deleteObject(userPhotosRef)
        .then(() => {
            // eslint-disable-next-line no-console
            console.log('photo has been deleted: ');
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('Error deleting photo: ', error);
        });
    // удаляем ссылку на файл из fireBase юзера
    deleteDoc(doc(projectFirestore, `user_${userId}`, `${imageFirebaseId}`));
};

const deleteCommonPhoto = ({ imageFirebaseId }: { imageFirebaseId: string | number }) => {
    // удаляем ссылку на файл из общей базы картинок в fireBase
    deleteDoc(doc(projectFirestore, `common_photos`, `${imageFirebaseId}`));
};

export const deletePhotos = ({ userId, imageName, imageFirebaseId }: any) => {
    deleteUserPhoto({ userId, imageName, imageFirebaseId });
    deleteCommonPhoto({ imageFirebaseId });

    return 'delettingPhotoSuccess';
};

export const snapshotCommonPhotos = async (
    funcGoal: any,
    setUrlImages: any = null,
    urlImages: any = null,
    // eslint-disable-next-line @typescript-eslint/require-await
) => {
    // делаем снимок и подписываемся на изменения в коллекции "common_photos"
    onSnapshot(collection(projectFirestore, `common_photos`), (querySnapshot) => {
        const allImagesUrl: any = [];
        querySnapshot.forEach((item) => {
            allImagesUrl.push({ id: item.id, ...item.data() });
        });
        if (funcGoal === 'subscribe') {
            const isEqualPhotos = allImagesUrl.length !== urlImages.length;
            if (isEqualPhotos) setUrlImages(allImagesUrl);
        }
    });
    return 'commonPhotosSnapshotSuccess';
};

export const snapshotUserPhotos = async (
    funcGoal: any,
    user: any,
    setUrlImages: any = null,
    urlImages: any = null,
    // eslint-disable-next-line @typescript-eslint/require-await
) => {
    onSnapshot(collection(projectFirestore, user), (querySnapshot) => {
        const allImagesUrl: any = [];
        querySnapshot.forEach((item) => {
            allImagesUrl.push({ id: item.id, ...item.data() });
        });
        if (funcGoal === 'subscribe') {
            const isEqualPhotos = allImagesUrl.length !== urlImages.length;
            if (isEqualPhotos) setUrlImages(allImagesUrl);
        }
    });
    return 'userPhotosSnapshotSuccess';
};

const serializeSnapshotPhotos = (nonSerializePhotos: any) => {
    return [...nonSerializePhotos].map((item) => {
        return { ...item, addedTime: { ...item.addedTime } };
    });
};

const sortPhotos = (photos: any) =>
    photos.sort((a: any, b: any) => b.addedTime.seconds - a.addedTime.seconds);

export const sortAndSerializePhotos = (photosArray: any) => {
    const serializedPhotos = serializeSnapshotPhotos(photosArray);
    return sortPhotos(serializedPhotos);
};
