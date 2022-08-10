import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddUserPhotoType, DeleteUserPhotoType, PhotoType } from './types';

export type PhotoStorageStateTypes = {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    isDeleting: boolean;
    isDeletingSuccess: boolean;
    isDeletingError: boolean;
    deletingErrorMessage: string;

    isSubscribedUserPhotos: boolean;
    isSubscribedCommonPhotos: boolean;
    photos: PhotoType;

    [name: string]: any;
};

const initialState: PhotoStorageStateTypes = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    isDeleting: false,
    isDeletingSuccess: false,
    isDeletingError: false,
    deletingErrorMessage: '',

    isSubscribedUserPhotos: false,
    isSubscribedCommonPhotos: false,
    photos: [],

    isLookingMyPhotos: true,
    isLoadingNewPhoto: false,
    isLoadingUserPhotos: false,
    isLoadingCommonPhotos: false,
    isDeletingPhoto: false,
    userPhotos: [],
    commonPhotos: [],
};

const photoStorageSlice = createSlice({
    name: 'photoStorage',
    initialState,
    reducers: {
        addPhotoAttempt: (state, action: PayloadAction<AddUserPhotoType>) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
        addPhotoSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
        },
        addPhotoError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.payload;
        },
        deletePhotoAttempt: (state, action: PayloadAction<DeleteUserPhotoType>) => {
            state.isDeleting = true;
            state.isDeletingSuccess = false;
            state.isDeletingError = false;
            state.deletingErrorMessage = '';
        },
        deletePhotoSuccess: (state) => {
            state.isDeleting = false;
            state.isDeletingSuccess = true;
            state.isDeletingError = false;
            state.deletingErrorMessage = '';
        },
        deletePhotoError: (state, action: PayloadAction<string>) => {
            state.isDeleting = false;
            state.isDeletingSuccess = false;
            state.isDeletingError = true;
            state.deletingErrorMessage = action.payload;
        },
        subscribeUserPhotos: (state, action: PayloadAction<any>) => {
            state.isSubscribedUserPhotos = true;
        },
        unsubscribeUserPhotos: (state, action: PayloadAction<any>) => {
            state.isSubscribedUserPhotos = false;
        },
        subscribeCommonPhotos: (state, action: PayloadAction<any>) => {
            state.isSubscribedCommonPhotos = true;
        },
        unsubscribeCommonPhotos: (state, action: PayloadAction<any>) => {
            state.isSubscribedCommonPhotos = false;
        },
        setPhotos: (state, action: PayloadAction<PhotoType>) => {
            state.photos = action.payload;
        },

        setStatusLookingPhotos(state) {
            state.isLookingMyPhotos = !state.isLookingMyPhotos;
        },
    },
});

export const {
    setStatusLookingPhotos,
    addPhotoAttempt,
    addPhotoSuccess,
    addPhotoError,
    deletePhotoAttempt,
    deletePhotoSuccess,
    deletePhotoError,
    subscribeCommonPhotos,
    subscribeUserPhotos,
    unsubscribeCommonPhotos,
    unsubscribeUserPhotos,
    setPhotos,
} = photoStorageSlice.actions;
export const photoStorageReducer = photoStorageSlice.reducer;
