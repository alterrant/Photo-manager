import { motion } from 'framer-motion';
import { SyntheticEvent } from 'react';
import { SelectPhotoType } from '../../types/select-photo';

export const SelectedPhoto = ({ selectedPhotoUrl, setSelectedPhoto }: SelectPhotoType) => {
  const handleClick = (e: SyntheticEvent) => {
    if ((e.target as HTMLDivElement).classList.contains('selectedPhoto-wrapper')) {
      setSelectedPhoto(null);
    }
  };
  if (selectedPhotoUrl) {
    return (
      <div onClick={handleClick} className="selectedPhoto-wrapper">
        <motion.img
          src={selectedPhotoUrl}
          alt="selectedPhoto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.275 }}
        />
      </div>
    );
  }
  return <div>PhotoNotFound</div>;
};
