import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { UploadTaskSnapshot } from '@firebase/storage';
import { FirebaseError } from '@firebase/util';
import { projectFirestore, storage } from '../../firebase/config';
import {
  AddUserPhotoType,
  FirestoreSubscribeTypes,
  PhotoType,
  SnapshotPhotos,
  SnapshotPhotosData,
} from './types';
import { DOC_CHANGES_PHOTO_TYPES, DOC_PATH, STATE_CHANGED } from './constants';

export const uploadTask = (payload: AddUserPhotoType) => {
  const { userId, file, setProgress, setError, setUrl, destination } = payload;

  const storageReference = ref(storage, DOC_PATH.getUserPath(userId));
  const storagePhotosReference = ref(storageReference, destination);
  const storageFileReference = ref(storagePhotosReference, file.name);
  const timestamp = serverTimestamp();

  const next = (snap: UploadTaskSnapshot) => {
    // записываем фото в fireStore
    const progress = (snap.bytesTransferred / snap.totalBytes) * 100;

    setProgress(progress);
  };

  const complete = async () => {
    // выполняем при завершении
    const url = await getDownloadURL(storageFileReference);

    setUrl(url);
    // запись свойств файла и url в fireDataBase
    const dataFile = {
      addedTime: timestamp,
      name: file.name,
      imageUrl: url,
    };
    // записываем в профиль пользователя и запоминаем автосгенерированное id коллекции
    if (destination === 'photos') {
      const userPhotoCollection = await addDoc(
        collection(projectFirestore, DOC_PATH.getUserPath(userId), destination, 'photosCollection'),
        dataFile
      );
      const imageUserFirebaseId = userPhotoCollection.id;
      // записываем в общие фото
      await setDoc(doc(projectFirestore, DOC_PATH.getCommonPath(), imageUserFirebaseId), {
        ...dataFile,
        userId,
      });
    } else {
      await setDoc(doc(projectFirestore, DOC_PATH.getUserPath(userId), destination), dataFile);
    }
  };

  const error = (e: FirebaseError) => {
    // проверяем на ошибки при записи
    setError(e.code);
  };

  uploadBytesResumable(storageFileReference, file).on(STATE_CHANGED, next, error, complete);
};

const serializePhotos = (nonSerializedPhotos: SnapshotPhotos[]) =>
  [...nonSerializedPhotos].map(item => ({ ...item, addedTime: { ...item.addedTime } }));

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

  return onSnapshot(collection(projectFirestore, path), querySnapshot => {
    const documentChanges = querySnapshot.docChanges();

    documentChanges.forEach(changedPhoto => {
      if (changedPhoto.type === DOC_CHANGES_PHOTO_TYPES.ADDED) {
        const { imageUrl, name, addedTime } = changedPhoto.doc.data() as SnapshotPhotosData;
        const photo: SnapshotPhotos = {
          id: changedPhoto.doc.id,
          imageUrl,
          name,
          addedTime,
        };

        snapshotPhotos.push(photo);
      }
      if (changedPhoto.type === DOC_CHANGES_PHOTO_TYPES.REMOVED) {
        const photoIndex = snapshotPhotos.findIndex(photo => changedPhoto.doc.id === photo.id);

        snapshotPhotos.splice(photoIndex, 1);
      }
    });

    setStatePhotos(sortAndSerializePhotos(snapshotPhotos));
  });
};
