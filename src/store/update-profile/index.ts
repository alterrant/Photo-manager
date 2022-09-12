import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewProfileDataTypes } from './types';

type UpdateProfileError = string;

export type UpdateProfileStateTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: UpdateProfileStateTypes = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    updateProfileAttempt: (state, action: PayloadAction<NewProfileDataTypes>) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    updateProfileSuccess: state => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    updateProfileError: (state, action: PayloadAction<UpdateProfileError>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetUpdateProfileState: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

export const {
  updateProfileAttempt,
  updateProfileSuccess,
  updateProfileError,
  resetUpdateProfileState,
} = updateProfileSlice.actions;
export const updateProfileReducer = updateProfileSlice.reducer;
