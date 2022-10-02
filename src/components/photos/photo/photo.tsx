import { motion } from 'framer-motion';

import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseSvgContainer } from './close-svg-container';
import { SelectedPhotoId } from '../../../types/select-photo';
import { PhotoType } from '../../../store/photo-storage/types';

type PhotoTypes = {
  setSelectedPhotoId: Dispatch<SetStateAction<SelectedPhotoId>>;
  photos: PhotoType;
};

export const Photo = ({ setSelectedPhotoId, photos }: PhotoTypes) => {
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
            onClick={() => setSelectedPhotoId(item.id)}
            src={item.imageUrl}
            alt="imageFromBase"
          />
        </motion.li>
      ))}
    </>
  );
};
