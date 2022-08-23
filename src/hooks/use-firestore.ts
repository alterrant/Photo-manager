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
import { DOC_PATH } from '../store/photo-storage/constants';

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
  const path = DOC_PATH.getCommonPath();

  useEffect(() => {
    dispatch(subscribeCommonPhotos({ path, setStatePhotos }));

    return () => {
      dispatch(unsubscribeCommonPhotos({ path, setStatePhotos }));
    };
  }, [dispatch, setStatePhotos, path]);

  useDispatchStatePhotos(statePhotos);

  return photos;
};

export const useFirestoreGetUserPhotos = () => {
  const { dispatch, photos, statePhotos, setStatePhotos } = usePhotos();
  const { authUserProfile } = useAppSelector(auth);
  const path = DOC_PATH.getUserPath(authUserProfile.uid);

  useEffect(() => {
    dispatch(subscribeUserPhotos({ path, setStatePhotos }));

    return () => {
      dispatch(unsubscribeUserPhotos({ path, setStatePhotos }));
    };
  }, [path, dispatch, setStatePhotos]);

  useDispatchStatePhotos(statePhotos);

  return photos;
};
