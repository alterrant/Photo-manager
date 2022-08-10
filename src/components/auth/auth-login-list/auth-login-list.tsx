import { useState } from 'react';

import SignInForm from '../sign-in/sign-in';

import SignUpForm from '../sign-up/sign-up';

export const AuthLoginList = () => {
    const [isRegistrationPage, setRegistrationPage] = useState<boolean>(false);

    if (isRegistrationPage) {
        // @ts-ignore
        return <SignUpForm setRegistrationPage={setRegistrationPage} />;
    }
    // @ts-ignore
    return <SignInForm setRegistrationPage={setRegistrationPage} />;
};
