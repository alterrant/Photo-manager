import { useState } from 'react';
import { useFirestoreGetCommonPhotos } from '../../hooks/use-firestore';
import { Title } from '../titile';
import { Photo } from '../photos/photo';
import { SelectedPhoto } from '../selected-photo';
import { SelectedPhotoUrl } from '../../types/select-photo';

export const CommonPhotos = () => {
  let styleWrapperPhotos;
  const isOnePhoto = 'one-photo-grid';
  const isTwoPhoto = 'two-photo-grid';
  const [selectedPhotoUrl, setSelectedPhoto] = useState<SelectedPhotoUrl>(null);

  const commonPhotos = useFirestoreGetCommonPhotos();

  switch (commonPhotos.length) {
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
    <>
      <Title user="Common" />
      <div className="common-photo-wrapper">
        <ul className={styleWrapperPhotos}>
          <Photo setSelectedPhoto={setSelectedPhoto} photos={commonPhotos} />
        </ul>
      </div>
      {selectedPhotoUrl && (
        <SelectedPhoto selectedPhotoUrl={selectedPhotoUrl} setSelectedPhoto={setSelectedPhoto} />
      )}
    </>
  );
};
