import { useState } from 'react';
import { Title } from '../titile';
import { PhotoLoader } from '../photo-loader';
import { Photos } from '../photos';
import { SelectedPhotoId } from '../../types/select-photo';
import { SVGLoader } from '../assets/svg/loader';
import { PhotosCarousel } from '../photos-carousel';

export const UserPhotos = () => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<SelectedPhotoId>(null);

  return (
    <>
      <Title />
      <PhotoLoader destination="photos">
        <SVGLoader />
      </PhotoLoader>
      <Photos setSelectedPhotoId={setSelectedPhotoId} />
      {selectedPhotoId && (
        <PhotosCarousel initialSlide={selectedPhotoId} setSelectedPhotoId={setSelectedPhotoId} />
      )}
    </>
  );
};
