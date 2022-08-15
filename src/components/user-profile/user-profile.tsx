import { UserTitle } from '../main/user-titile';
import { PhotoLoader } from '../photo-loader';
import { Photos } from '../photos';
import { SelectedPhoto } from '../selected-photo';
import { SelectPhotoType } from '../main/main';

type UserProfileType = {
    selectPhoto: SelectPhotoType;
    isLookingMyPhotos: boolean;
};

export const UserPhotos = ({ selectPhoto, isLookingMyPhotos }: UserProfileType) => {
    return (
        <>
            <UserTitle />
            {/* <PhotoLoader fill={"#8A2BE2"} stroke={"#8A2BE2"}/> */}
            <PhotoLoader />
            <Photos
                setSelectedPhoto={selectPhoto.setSelectedPhoto}
                isLookingMyPhotos={isLookingMyPhotos}
            />
            {selectPhoto.selectedPhotoUrl && (
                <SelectedPhoto
                    selectedPhotoUrl={selectPhoto.selectedPhotoUrl}
                    setSelectedPhoto={selectPhoto.setSelectedPhoto}
                />
            )}
        </>
    );
};
