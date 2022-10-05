import { useAppSelector } from '../../hooks/react-redux';
import { photoStorage } from '../../selectors';

import './selected-photos.css';

type SelectedPhotosTypes = {
  selectedPhotos: string[];
  onClick: () => void;
};

export const SelectedPhotos = ({ selectedPhotos, onClick }: SelectedPhotosTypes) => {
  const { photos } = useAppSelector(photoStorage);

  const selectedPhotosList = selectedPhotos.map(photoId => {
    const photoUrl = photos.find(photo => photo.id === photoId)?.imageUrl;
    return (
      <img
        onClick={onClick}
        key={photoId}
        src={photoUrl}
        alt="selected"
        className="selected-photos_img"
      />
    );
  });

  return <div className="selected-photos_container">{selectedPhotosList}</div>;
};
