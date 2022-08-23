import { Dispatch, SetStateAction } from 'react';
import { Switch } from '../common/switch';

type SwitchPhotosTypes = {
  isLookingMyPhotos: boolean;
  watchPhotosToggle: Dispatch<SetStateAction<boolean>>;
};

export const SwitchPhotos = ({ isLookingMyPhotos, watchPhotosToggle }: SwitchPhotosTypes) => (
  <div className="switchPhotosWrapper">
    <Switch
      isOn={isLookingMyPhotos}
      onColor="#7366bd"
      handleToggle={() => watchPhotosToggle(!isLookingMyPhotos)}
    />
    <p className="switchPhotosLabel">
      {isLookingMyPhotos ? 'Swipe to view common pictures' : 'Swipe to view my pictures'}
    </p>
  </div>
);
