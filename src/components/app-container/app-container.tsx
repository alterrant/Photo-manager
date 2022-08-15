import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { App } from '../../pages/main';
import { Auth } from '../auth';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { logInSuccess, logOut } from '../../store/auth';

import '../../pages/main/app.css';

export const AppContainer = () => {
    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { providerId, photoURL, phoneNumber, email, displayName, uid } = currentUser;
                const userProfile = {
                    providerId,
                    photoURL,
                    phoneNumber,
                    email,
                    displayName,
                    uid,
                };

                dispatch(logInSuccess(userProfile));
            } else {
                dispatch(logOut());
            }
        });
    }, [dispatch]);

    return isAuth ? <App /> : <Auth />;
};
