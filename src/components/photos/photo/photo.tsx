import { motion } from 'framer-motion';

import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseSvgContainer } from './close-svg-container';
import { SelectedPhotoUrl } from '../../../types/select-photo';
import { PhotoType } from '../../../store/photo-storage/types';

type PhotoTypes = {
  setSelectedPhoto: Dispatch<SetStateAction<SelectedPhotoUrl>>;
  photos: PhotoType;
};

export const Photo = ({ setSelectedPhoto, photos }: PhotoTypes) => {
  const location = useLocation().pathname;

  return (
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
          {location === '/my-photos' && (
            <CloseSvgContainer imageName={item.name} imageFirebaseId={item.id} />
          )}
          <img
            onClick={() => setSelectedPhoto(item.imageUrl)}
            src={item.imageUrl}
            alt="imageFromBase"
          />
        </motion.li>
      ))}
    </>
  );
};
