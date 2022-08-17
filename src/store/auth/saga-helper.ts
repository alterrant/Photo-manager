import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

import { OAuthService } from './types';
import { SERVICES } from './constants';

const getLogInProvider = (service: OAuthService) => {
    if (service === SERVICES.GOOGLE) return new GoogleAuthProvider();
    return new GithubAuthProvider();
};

export const OAuthLogIn = (service: OAuthService) => {
    const provider = getLogInProvider(service);
    const auth = getAuth();

    signInWithRedirect(auth, provider);
};
