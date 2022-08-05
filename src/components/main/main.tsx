import { useState } from 'react';

import { useAppSelector } from '../../hooks';
import CommonPhotos from '../common-photos/common-photos';
import SwitchPhotos from '../header/switch-photos';
import UserPhotos from '../user-profile/user-profile';

function Main() {
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
}

export default Main;
