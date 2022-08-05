import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    addUserPhoto,
    deletePhotos,
    snapshotCommonPhotos,
    snapshotUserPhotos,
    sortAndSerializePhotos,
} from '../firebase/firestore';

const initialState = {
    isLookingMyPhotos: true,
    isLoadingNewPhoto: false,
    isLoadingUserPhotos: false,
    isLoadingCommonPhotos: false,
    isDeletingPhoto: false,
    userPhotos: [],
    commonPhotos: [],
};

export const addNewPhoto = createAsyncThunk(
    'photoStorage/addNewPhoto',

    (props: any) => {
        return addUserPhoto(props);
    },
);
export const deletePhoto = createAsyncThunk(
    'photoStorage/deletePhoto',

    (props: any) => {
        return deletePhotos(props);
    },
);
export const subscribeCommonPhotos = createAsyncThunk(
    'photoStorage/subscribeCommonPhotos',

    async ({ setUrlImages, urlImages }: any) => {
        await snapshotCommonPhotos('subscribe', setUrlImages, urlImages);

        return sortAndSerializePhotos(urlImages);
    },
);
export const subscribeUserPhotos = createAsyncThunk(
    'photoStorage/subscribeUserPhotos',

    async ({ user, setUrlImages, urlImages }: any) => {
        await snapshotUserPhotos('subscribe', user, setUrlImages, urlImages);
        return sortAndSerializePhotos(urlImages);
    },
);
export const unsubscribeUserPhotos = (user: any) => () => {
    snapshotUserPhotos('unSubscribe', user);
};
export const unsubscribeCommonPhotos = () => () => {
    snapshotCommonPhotos('unSubscribe');
};

const photoStorageSlice = createSlice({
    name: 'photoStorage',
    initialState,
    reducers: {
        setStatusLookingPhotos(state) {
            state.isLookingMyPhotos = !state.isLookingMyPhotos;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewPhoto.pending, (state) => {
                state.isLoadingNewPhoto = true;
            })
            .addCase(addNewPhoto.fulfilled, (state) => {
                state.isLoadingNewPhoto = false;
            })
            .addCase(deletePhoto.pending, (state) => {
                state.isDeletingPhoto = true;
            })
            .addCase(deletePhoto.fulfilled, (state) => {
                state.isDeletingPhoto = false;
            })
            .addCase(subscribeCommonPhotos.pending, (state) => {
                state.isLoadingCommonPhotos = true;
            })
            .addCase(subscribeCommonPhotos.fulfilled, (state, action) => {
                state.isLoadingCommonPhotos = false;
                state.commonPhotos = action.payload;
            })
            .addCase(subscribeUserPhotos.pending, (state) => {
                state.isLoadingUserPhotos = true;
            })
            .addCase(subscribeUserPhotos.fulfilled, (state, action) => {
                state.isLoadingUserPhotos = false;
                state.userPhotos = action.payload;
            });
    },
});

export const { setStatusLookingPhotos } = photoStorageSlice.actions;

export default photoStorageSlice.reducer;
