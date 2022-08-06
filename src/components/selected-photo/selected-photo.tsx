import { motion } from 'framer-motion';

export const SelectedPhoto = ({ selectedPhoto, setSelectedPhoto }: any) => {
    const handleClick = (e: any) => {
        if (e.target.classList.contains('selectedPhoto-wrapper')) {
            setSelectedPhoto(null);
        }
    };

    return (
        <div onClick={handleClick} className='selectedPhoto-wrapper'>
            <motion.img
                src={selectedPhoto}
                alt='selectedPhoto'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.275 }}
            />
        </div>
    );
};
