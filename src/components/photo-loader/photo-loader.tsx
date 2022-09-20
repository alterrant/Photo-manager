import { useState, ReactNode, useEffect } from 'react';

import { ProgressBar } from './progress-bar';
import { SetErrorType, SetProgressType, SetUrlType } from '../../store/photo-storage/types';
import { addPhotoAttempt } from '../../store/photo-storage';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { auth } from '../../selectors';

type PhotoLoaderTypes = {
  destination: 'profileAvatar' | 'photos';
  children: ReactNode;
};

export const PhotoLoader = ({ destination, children }: PhotoLoaderTypes) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<SetErrorType>(null);
  const [progress, setProgress] = useState<SetProgressType>(0);
  const [url, setUrl] = useState<SetUrlType>(null);

  const dispatch = useAppDispatch();
  const { uid: userId } = useAppSelector(auth).authUserProfile;
  const allowedTypes = new Set(['image/png', 'image/jpeg']);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const selectFile = event.currentTarget.files![0];

    if (selectFile && allowedTypes.has(selectFile.type)) {
      setFile(selectFile);
      setError('');
    } else {
      setFile(null);
      setError('Please choose png or jpeg file');
    }
  };

  useEffect(() => {
    if (file) {
      dispatch(addPhotoAttempt({ userId, file, setProgress, setError, setUrl, destination }));
    }
  }, [dispatch, userId, file, destination]);

  useEffect(() => {
    if (url) setFile(null);
  }, [url, setFile]);

  return (
    <>
      <div className="wrapper-input">
        <input className="inputfile" type="file" onChange={handleChange} id="inputImage" />
        <label
          className={destination === 'profileAvatar' ? 'profile-image-loader' : 'main-image-loader'}
          htmlFor="inputImage"
        >
          {children}
        </label>
      </div>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file !== null && <div>{file.name}</div>}
        {file !== null && <ProgressBar error={error} progress={progress} />}
      </div>
    </>
  );
};
