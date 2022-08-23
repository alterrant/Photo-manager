import { Dispatch, SetStateAction } from 'react';

export type UserIdTypes = string;
export type SetProgressType = number;
export type SetErrorType = string | null;
export type SetUrlType = string | null;

export type AddUserPhotoType = {
  userId: UserIdTypes;
  file: File;
  setProgress: Dispatch<SetStateAction<SetProgressType>>;
  setError: Dispatch<SetStateAction<SetErrorType>>;
  setUrl: Dispatch<SetStateAction<SetUrlType>>;
};

export type DeleteUserPhotoType = {
  userId: string;
  imageName: string;
  imageFirebaseId: string;
};

export type FirestoreSubscribeTypes = {
  path: string;
  setStatePhotos: Dispatch<SetStateAction<PhotoType>>;
};

export type PhotoType = SnapshotPhotos[];

export type SnapshotPhotosData = {
  imageUrl: string;
  name: string;
  addedTime: {
    nanoseconds: number;
    seconds: number;
  };
};
export type SnapshotPhotos = SnapshotPhotosData & {
  id: string;
};

export type PhotoStorageStateTypes = AddPhotoTypes & DeletePhotoTypes & SubscribeFirestoreTypes;

type AddPhotoTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

type DeletePhotoTypes = {
  isDeleting: boolean;
  isDeletingSuccess: boolean;
  isDeletingError: boolean;
  deletingErrorMessage: string;
};

type SubscribeFirestoreTypes = {
  isSubscribedUserPhotos: boolean;
  isSubscribedCommonPhotos: boolean;
  photos: PhotoType;
};
