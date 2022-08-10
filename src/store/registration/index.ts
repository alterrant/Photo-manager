import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RegistrationRequestTypes } from './types';

type RegistrationError = string;

type InitialStateTypes = {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
};

const initialState: InitialStateTypes = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        sendRegistrationRequest: (state, payload: PayloadAction<RegistrationRequestTypes>) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
        registrationSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        registrationError: (state, payload: PayloadAction<RegistrationError>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = '';
        },
        resetRegistrationState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
    },
});

export const {
    sendRegistrationRequest,
    registrationSuccess,
    registrationError,
    resetRegistrationState,
} = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
