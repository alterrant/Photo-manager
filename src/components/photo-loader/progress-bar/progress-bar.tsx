import { motion } from 'framer-motion';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addPhotoAttempt } from '../../../store/photo-storage';
import { auth } from '../../../selectors';
import { SetErrorType, SetProgressType, SetUrlType } from '../../../store/photo-storage/types';

type ProgressBarTypes = {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export const ProgressBar = ({ file, setFile }: ProgressBarTypes) => {
  const { uid } = useAppSelector(auth).authUserProfile;
  const userId = uid;
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState<SetProgressType>(0);
  const [error, setError] = useState<SetErrorType>(null);
  const [url, setUrl] = useState<SetUrlType>(null);

  useEffect(() => {
    dispatch(addPhotoAttempt({ userId, file, setProgress, setError, setUrl }));
  }, [dispatch, userId, file]);

  useEffect(() => {
    if (url) setFile(null);
  }, [url, setFile]);

  if (!error) {
    return (
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      />
    );
  }
  return <div>empty</div>;
};
