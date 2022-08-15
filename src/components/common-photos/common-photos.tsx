import { useFirestoreGetCommonPhotos } from '../../hooks/useFirestore';
import { UserTitle } from '../main/user-titile';
import { Photo } from '../photos/photo';
import { SelectedPhoto } from '../selected-photo';
import { SelectPhotoType } from '../main/main';

type CommonPhotosTypes = {
    isLookingMyPhotos: boolean;
    selectPhoto: SelectPhotoType;
};

export const CommonPhotos = ({ selectPhoto, isLookingMyPhotos }: CommonPhotosTypes) => {
    const isOnePhoto = 'one-photo-grid';
    const isTwoPhoto = 'two-photo-grid';
    let styleWrapperPhotos;

    const commonPhotos = useFirestoreGetCommonPhotos();

    switch (commonPhotos && commonPhotos.length) {
        case 1:
            styleWrapperPhotos = isOnePhoto;
            break;

        case 2:
            styleWrapperPhotos = isTwoPhoto;
            break;

        default:
            styleWrapperPhotos = 'photos-wrapper';
            break;
    }

    return (
        <>
            <UserTitle user='Common' />
            <div className='common-photo-wrapper'>
                <ul className={styleWrapperPhotos}>
                    <Photo
                        isLookingMyPhotos={isLookingMyPhotos}
                        setSelectedPhoto={selectPhoto.setSelectedPhoto}
                        photos={commonPhotos}
                    />
                </ul>
            </div>
            {selectPhoto.selectedPhotoUrl && (
                <SelectedPhoto
                    selectedPhotoUrl={selectPhoto.selectedPhotoUrl}
                    setSelectedPhoto={selectPhoto.setSelectedPhoto}
                />
            )}
        </>
    );
};
