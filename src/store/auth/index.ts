import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@firebase/auth';
import { EmailPass, OAuthService } from './types';

export type AuthStateTypes = {
    isAuth: boolean;
    isLoading: boolean;
    errorMessage: string;
    authUserProfile: AuthUserProfileTypes;
};

export type AuthUserProfileTypes = UserInfo;

type LogInError = string;

const defaultUserProfile = {
    providerId: '',
    photoURL: '',
    phoneNumber: '',
    email: '',
    displayName: '',
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
        logInSuccess: (state, action: PayloadAction<UserInfo>) => {
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
        OAuthLoginAttempt: (state, action: PayloadAction<OAuthService>) => {
            state.isAuth = false;
            state.isLoading = false;
            state.errorMessage = '';
            state.authUserProfile = defaultUserProfile;
        },
        OAuthLoginSuccess: (state) => {
            state.isAuth = true;
            state.isLoading = false;
            state.errorMessage = '';
        },
        OAuthLoginError: (state, action: PayloadAction<LogInError>) => {
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

export const {
    logInAttempt,
    logInSuccess,
    loginError,
    OAuthLoginAttempt,
    OAuthLoginSuccess,
    OAuthLoginError,
    logOut,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
