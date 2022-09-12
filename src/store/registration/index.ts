import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RegistrationRequestTypes } from './types';

type RegistrationError = string;

export type RegistrationStateTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: RegistrationStateTypes = {
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
    registrationSuccess: state => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    registrationError: (state, action: PayloadAction<RegistrationError>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    registrationErrorReset: state => {
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
  registrationErrorReset,
} = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
