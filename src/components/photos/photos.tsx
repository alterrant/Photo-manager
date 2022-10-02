import React, { Dispatch, SetStateAction } from 'react';

import { Photo } from './photo';
import { useFirestoreGetUserPhotos } from '../../hooks/use-firestore';
import { SelectedPhotoId } from '../../types/select-photo';

type PhotosType = {
  setSelectedPhotoId: Dispatch<SetStateAction<SelectedPhotoId>>;
};

export const Photos = (properties: PhotosType) => {
  const isOnePhoto = 'one-photo-grid';
  const isTwoPhoto = 'two-photo-grid';
  let styleWrapperPhotos;

  const userPhotos = useFirestoreGetUserPhotos();

  switch (userPhotos.length) {
    case 1:
      styleWrapperPhotos = isOnePhoto;
      break;

    case 2:
      styleWrapperPhotos = isTwoPhoto;
      break;

    default:
      styleWrapperPhotos = 'photos-wrapper';
      break;
  }

  return (
    <div>
      <ul className={styleWrapperPhotos}>
        <Photo {...properties} photos={userPhotos} />
      </ul>
    </div>
  );
};
