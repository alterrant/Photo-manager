import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stopSubmit, SubmissionError } from 'redux-form';

import { logOutRequest, signIn, signUpRequest } from '../../firebase/auth';

const initialState = {
    isAuth: false,
    isFetchingLogIn: false,
    isFetchingLogOut: false,

    authUserProfile: {
        displayName: null,
        email: null,
        photoURL: null,
        emailVerified: null,
        uid: null,
    },
};

type EmailPass = {
    email: string;
    password: string;
};

export const logIn = createAsyncThunk(
    'auth/logIn',

    async ({ email, password }: EmailPass, dispatch) => {
        const result = await signIn({ email, password });

        if (!result) {
            // @ts-ignore
            dispatch(
                stopSubmit('signInForm', {
                    _error: 'Invalid email or password',
                    email: ' ',
                    password: ' ',
                }),
            );
        }

        return result as any;
    },
);

export const signUp = createAsyncThunk(
    'auth/signUp',

    async ({ email, password }: EmailPass) => {
        const signedUp = await signUpRequest({ email, password });

        if (signedUp.error) {
            if (signedUp.error.errorCode === 'auth/email-already-in-use')
                throw new SubmissionError({
                    _error: 'email already exist',
                    email: ' ',
                    password: ' ',
                });

            if (signedUp.error.errorCode === 'auth/invalid-email')
                throw new SubmissionError({
                    _error: 'invalid email',
                    email: ' ',
                    password: ' ',
                });

            throw new SubmissionError({
                _error: signedUp.error.errorCode,
                email: ' ',
                password: ' ',
            });
        }

        return signedUp;
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthProfile(state, action) {
            if (action.payload) {
                state.isAuth = true;

                state.authUserProfile = action.payload;
            }
        },
        logOut(state) {
            state.isFetchingLogOut = false;
            state.isAuth = false;

            state.authUserProfile = {
                displayName: null,
                email: null,
                photoURL: null,
                emailVerified: null,
                uid: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isFetchingLogIn = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isFetchingLogIn = false;
                state.isAuth = true;

                state.authUserProfile = action.payload;
            });
    },
});

export const { setAuthProfile, logOut } = authSlice.actions;

export default authSlice.reducer;

export const loggingOut = () => (dispatch: any) => {
    logOutRequest();

    dispatch(logOut());
};
