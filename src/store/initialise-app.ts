import { createSlice } from '@reduxjs/toolkit';

import { setAuthProfile } from './auth';
import { createUserProfile } from '../firebase/auth';

const initialState = {
    isInitialized: false,
};

const initialiseAppSlice = createSlice({
    name: 'initialiseApp',
    initialState,
    reducers: {
        setInitializedSuccess(state) {
            state.isInitialized = true;
        },
    },
});

export const { setInitializedSuccess } = initialiseAppSlice.actions;

export default initialiseAppSlice.reducer;

export const initialize: any = (currentUser: any) => (dispatch: any) => {
    if (currentUser) {
        const userProfile = createUserProfile(currentUser);

        dispatch(setAuthProfile(userProfile));
    }

    dispatch(setInitializedSuccess());
};
