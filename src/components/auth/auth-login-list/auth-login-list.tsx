import { useReducer } from 'react';

import { SignIn } from '../sign-in';
import { SignUp } from '../sign-up';
import reducerLoginList, {
    initialState,
    setEmailPassLogin,
    setSignUp,
} from '../../../store/auth-login-list';

export const AuthLoginList = () => {
    const [state, dispatch] = useReducer(reducerLoginList, initialState);
    const signInForm = () => dispatch(setEmailPassLogin());
    const signUpForm = () => dispatch(setSignUp());
    switch (state.authLogin) {
        case 'signUp':
            // @ts-ignore
            return <SignUp signInForm={signInForm} />;
        case 'signInEmailPass':
            // @ts-ignore
            return <SignIn signUpForm={signUpForm} />;
        default:
            // @ts-ignore
            return <SignUp signInForm={signInForm} />;
    }
};
