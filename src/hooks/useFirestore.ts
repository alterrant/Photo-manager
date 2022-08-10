import { useEffect, useState } from 'react';

import {
    subscribeCommonPhotos,
    unsubscribeCommonPhotos,
    subscribeUserPhotos,
    unsubscribeUserPhotos,
    setPhotos,
} from '../store/photo-storage';
import { useAppDispatch, useAppSelector } from './index';
import { auth, photoStorage } from '../selectors';
import { PhotoType } from '../store/photo-storage/types';

const useDispatchStatePhotos = (statePhotos: PhotoType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPhotos(statePhotos));
    }, [dispatch, statePhotos]);
};

const usePhotos = () => {
    const dispatch = useAppDispatch();
    const { photos } = useAppSelector(photoStorage);
    const [statePhotos, setStatePhotos] = useState<PhotoType>([]);

    return { dispatch, photos, statePhotos, setStatePhotos };
};

export const useFirestoreGetCommonPhotos = () => {
    const { dispatch, photos, statePhotos, setStatePhotos } = usePhotos();
    const path = `common_photos`;

    useEffect(() => {
        dispatch(subscribeCommonPhotos({ path, setStatePhotos, goal: 'subscribe' }));

        return () => {
            dispatch(unsubscribeCommonPhotos({ path, setStatePhotos, goal: 'unsubscribe' }));
        };
    }, [dispatch, setStatePhotos, path]);

    useDispatchStatePhotos(statePhotos);

    return photos;
};

export const useFirestoreGetUserPhotos = () => {
    const { dispatch, photos, statePhotos, setStatePhotos } = usePhotos();
    const { authUserProfile } = useAppSelector(auth);
    const path = `user_${authUserProfile.uid}`;

    useEffect(() => {
        dispatch(subscribeUserPhotos({ path, setStatePhotos }));

        return () => {
            dispatch(unsubscribeUserPhotos({ path, setStatePhotos }));
        };
    }, [path, dispatch, setStatePhotos]);

    useDispatchStatePhotos(statePhotos);

    return photos;
};
