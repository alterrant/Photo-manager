import { UserTitle } from '../main/user-titile';
import { PhotoLoader } from '../photo-loader';
import { Photos } from '../photos';
import { SelectedPhoto } from '../selected-photo';

export const UserPhotos = ({ selectedPhoto }: any) => {
    return (
        <>
            <UserTitle />
            {/* <PhotoLoader fill={"#8A2BE2"} stroke={"#8A2BE2"}/> */}
            <PhotoLoader />
            <Photos setSelectedPhoto={selectedPhoto.setSelectedPhoto} />
            {selectedPhoto.selectedPhoto && (
                <SelectedPhoto
                    selectedPhoto={selectedPhoto.selectedPhoto}
                    setSelectedPhoto={selectedPhoto.setSelectedPhoto}
                />
            )}
        </>
    );
};
