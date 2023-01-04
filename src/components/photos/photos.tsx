import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import { Photo } from './photo';
import { useFirestoreGetUserPhotos } from '../../hooks/use-firestore';
import { SelectedPhotoId } from '../../types/select-photo';

type PhotosType = {
  setSelectedPhotoId: Dispatch<SetStateAction<SelectedPhotoId>>;
};

export const Photos = (properties: PhotosType) => {
  const userPhotos = useFirestoreGetUserPhotos();

  return (
    <ul className={classNames('photos-wrapper', userPhotos.length === 1 && 'one-photo-grid')}>
      <Photo {...properties} photos={userPhotos} />
    </ul>
  );
};
