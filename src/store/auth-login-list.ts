import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    authLogin: 'signInEmailPass',
};

const loginListSlice = createSlice({
    name: 'loginList',
    initialState,
    reducers: {
        setEmailPassLogin(state) {
            state.authLogin = 'signInEmailPass';
        },
        setSignUp(state) {
            state.authLogin = 'signUp';
        },
    },
});

export const { setEmailPassLogin, setSignUp } = loginListSlice.actions;

export default loginListSlice.reducer;
