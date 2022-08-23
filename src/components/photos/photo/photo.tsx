import { motion } from 'framer-motion';

import { Dispatch, SetStateAction } from 'react';
import { CloseSvgContainer } from './close-svg-container';
import { SelectedPhotoUrl } from '../../main/main';
import { PhotoType } from '../../../store/photo-storage/types';

type PhotoTypes = {
  setSelectedPhoto: Dispatch<SetStateAction<SelectedPhotoUrl>>;
  isLookingMyPhotos: boolean;
  photos: PhotoType;
};

export const Photo = ({ setSelectedPhoto, photos, isLookingMyPhotos }: PhotoTypes) => (
  <>
    {photos.map(item => (
      <motion.li
        className="image-wrapper"
        key={item.id}
        layout
        transition={{ duration: 0.275 }}
        whileHover={{
          opacity: 1,
          boxShadow: '8px 8px 15px 3px rgba(128,0,128,0.5)',
        }}
      >
        {isLookingMyPhotos && <CloseSvgContainer imageName={item.name} imageFirebaseId={item.id} />}
        <img
          onClick={() => setSelectedPhoto(item.imageUrl)}
          src={item.imageUrl}
          alt="imageFromBase"
        />
      </motion.li>
    ))}
  </>
);
