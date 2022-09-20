import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Switcher } from '../common/switcher';

import './switch-photos.css';

type SwitchPhotosTypes = {
  isLookingMyPhotos: boolean;
  watchPhotosToggle: Dispatch<SetStateAction<boolean>>;
};

export const SwitchPhotos = ({ isLookingMyPhotos, watchPhotosToggle }: SwitchPhotosTypes) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const toggleHandler = () => {
    if (location === '/my-photos') navigate('/common-photos');
    else navigate('/my-photos');
  };

  return (
    <div className="switchPhotosWrapper">
      <Switcher
        isOn={isLookingMyPhotos}
        onColor="#7366bd"
        handleToggle={() => {
          navigate('/my-photos');
          toggleHandler();
          watchPhotosToggle(!isLookingMyPhotos);
        }}
      />
      <p className="switchPhotosLabel">
        {isLookingMyPhotos ? 'Swipe to view common pictures' : 'Swipe to view my pictures'}
      </p>
    </div>
  );
};
