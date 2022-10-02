import { useState } from 'react';
import { useFirestoreGetCommonPhotos } from '../../hooks/use-firestore';
import { Title } from '../titile';
import { Photo } from '../photos/photo';
import { SelectedPhotoId } from '../../types/select-photo';
import { PhotosCarousel } from '../photos-carousel';

export const CommonPhotos = () => {
  let styleWrapperPhotos;
  const isOnePhoto = 'one-photo-grid';
  const isTwoPhoto = 'two-photo-grid';
  const [selectedPhotoId, setSelectedPhotoId] = useState<SelectedPhotoId>(null);

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
          <Photo setSelectedPhotoId={setSelectedPhotoId} photos={commonPhotos} />
        </ul>
      </div>
      {selectedPhotoId && (
        <PhotosCarousel initialSlide={selectedPhotoId} setSelectedPhotoId={setSelectedPhotoId} />
      )}
    </>
  );
};
