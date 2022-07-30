import {useEffect, useState} from "react";
import {
  subscribeCommonPhotos,
  subscribeUserPhotos,
  unsubscribeCommonPhotos,
  unsubscribeUserPhotos
} from "../store/photo-storage";
import {useAppDispatch, useAppSelector} from "./index";

export const useFirestoreGetUserImages = () => {

  const dispatch = useAppDispatch();
  const userPhotos = useAppSelector(state => state.photoStorage.userPhotos);
  const authUserId = useAppSelector(state => state.auth.authUserProfile.uid);

  const [urlImages, setUrlImages] = useState([]);
  const user = `user_${authUserId}`;

  useEffect(() => {
    dispatch(subscribeUserPhotos({user, setUrlImages, urlImages}));
    return () => dispatch(unsubscribeUserPhotos(user));
  }, [urlImages]);

  return [userPhotos];
}

export const useFirestoreGetAllImages = () => {

  const dispatch = useAppDispatch();
  const commonPhotos = useAppSelector(state => state.photoStorage.commonPhotos);
  const [urlImages, setUrlImages] = useState([]);

  useEffect(() => {
    dispatch(subscribeCommonPhotos({setUrlImages, urlImages}));
    return () => dispatch(unsubscribeCommonPhotos());
  }, [urlImages]);

  return [commonPhotos];
}