import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailPass } from './types';

export type AuthStateTypes = {
    isAuth: boolean;
    isLoading: boolean;
    errorMessage: string;
    authUserProfile: AuthUserProfileTypes;
};

export type AuthUserProfileTypes = {
    uid: string;
    [name: string]: string;
};

type LogInError = string;

const defaultUserProfile = {
    uid: '',
};

const initialState: AuthStateTypes = {
    isAuth: false,
    isLoading: false,
    errorMessage: '',
    authUserProfile: defaultUserProfile,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInAttempt: (state, action: PayloadAction<EmailPass>) => {
            state.isAuth = false;
            state.isLoading = true;
            state.errorMessage = '';
            state.authUserProfile = defaultUserProfile;
        },
        logInSuccess: (state, action: PayloadAction<AuthUserProfileTypes>) => {
            state.isAuth = true;
            state.isLoading = false;
            state.errorMessage = '';
            state.authUserProfile = action.payload;
        },
        loginError: (state, action: PayloadAction<LogInError>) => {
            state.isAuth = false;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.authUserProfile = defaultUserProfile;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.isLoading = false;
            state.errorMessage = '';
            state.authUserProfile = defaultUserProfile;
        },
    },
});

export const { logInAttempt, logInSuccess, loginError, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
