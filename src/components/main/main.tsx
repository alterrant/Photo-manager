import { useState } from 'react';

import { useAppSelector } from '../../hooks';
import { CommonPhotos } from '../common-photos';
import { SwitchPhotos } from '../switch-photos';
import { UserPhotos } from '../user-profile';

export const Main = () => {
    const isLookingMyPhotos = useAppSelector((state) => state.photoStorage.isLookingMyPhotos);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const selectPhoto = { selectedPhoto, setSelectedPhoto };

    return (
        <>
            <SwitchPhotos />
            {isLookingMyPhotos ? (
                <UserPhotos selectedPhoto={selectPhoto} />
            ) : (
                <CommonPhotos selectedPhoto={selectPhoto} />
            )}
        </>
    );
};
