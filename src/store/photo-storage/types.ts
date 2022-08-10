import { Dispatch, SetStateAction } from 'react';

export type UserPhotoTypes = any;

export type UserIdTypes = string | number;

export type AddUserPhotoType = {
    userId: UserIdTypes;
    file: UserPhotoTypes;
    setProgress: any;
    setError: any;
    setUrl: any;
};

export type DeleteUserPhotoType = {
    userId: string | number;
    imageName: string;
    imageFirebaseId: string | number;
};

export type PhotoType = Record<string, string>[];
export type SetCommonPhotoType = Dispatch<SetStateAction<PhotoType>>;
