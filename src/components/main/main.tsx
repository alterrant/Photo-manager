import { Dispatch, SetStateAction, useState } from 'react';

import { CommonPhotos } from '../common-photos';
import { SwitchPhotos } from '../switch-photos';
import { UserPhotos } from '../user-profile';

export type SelectedPhotoUrl = string | null;
export type SelectPhotoType = {
    selectedPhotoUrl: SelectedPhotoUrl;
    setSelectedPhoto: Dispatch<SetStateAction<SelectedPhotoUrl>>;
};

export const Main = () => {
    const [isLookingMyPhotos, watchPhotosToggle] = useState<boolean>(true);
    const [selectedPhotoUrl, setSelectedPhoto] = useState<SelectedPhotoUrl>(null);
    const selectPhoto: SelectPhotoType = { selectedPhotoUrl, setSelectedPhoto };

    return (
        <>
            <SwitchPhotos
                isLookingMyPhotos={isLookingMyPhotos}
                watchPhotosToggle={watchPhotosToggle}
            />
            {isLookingMyPhotos ? (
                <UserPhotos selectPhoto={selectPhoto} isLookingMyPhotos={isLookingMyPhotos} />
            ) : (
                <CommonPhotos selectPhoto={selectPhoto} isLookingMyPhotos={isLookingMyPhotos} />
            )}
        </>
    );
};
