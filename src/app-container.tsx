import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { App } from './app';
import { Auth } from './components/auth';
import { Preloader } from './components/common/preloader';
import { useAppDispatch, useAppSelector } from './hooks';
import { initialize } from './store/initialise-app';

import './app.css';

export const AppContainer = () => {
    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);
    const isInit = useAppSelector((state) => state.initialiseApp.isInitialized);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(initialize(currentUser));
            } else {
                dispatch(initialize());
            }
        });
    }, [dispatch]);

    if (!isInit) return <Preloader />;

    return isAuth ? <App /> : <Auth />;
};
