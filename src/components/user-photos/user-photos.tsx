import { useState } from 'react';
import { Title } from '../titile';
import { PhotoLoader } from '../photo-loader';
import { Photos } from '../photos';
import { SelectedPhoto } from '../selected-photo';
import { SelectedPhotoUrl } from '../../types/select-photo';
import { SVGLoader } from '../assets/svg/loader';

export const UserPhotos = () => {
  const [selectedPhotoUrl, setSelectedPhoto] = useState<SelectedPhotoUrl>(null);

  return (
    <>
      <Title />
      {/* <PhotoLoader fill={"#8A2BE2"} stroke={"#8A2BE2"}/> */}
      <PhotoLoader destination="photos">
        <SVGLoader />
      </PhotoLoader>
      <Photos setSelectedPhoto={setSelectedPhoto} />
      {selectedPhotoUrl && (
        <SelectedPhoto selectedPhotoUrl={selectedPhotoUrl} setSelectedPhoto={setSelectedPhoto} />
      )}
    </>
  );
};
