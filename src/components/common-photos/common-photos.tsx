import React from 'react';

import { useFirestoreGetCommonPhotos } from '../../hooks/useFirestore';
import { UserTitle } from '../main/user-titile';
import { Photo } from '../photos/photo';
import { SelectedPhoto } from '../selected-photo';

export const CommonPhotos = ({ selectedPhoto }: any) => {
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
                        setSelectedPhoto={selectedPhoto.setSelectedPhoto}
                        photos={commonPhotos}
                    />
                </ul>
            </div>
            {selectedPhoto.selectedPhoto && (
                <SelectedPhoto
                    selectedPhoto={selectedPhoto.selectedPhoto}
                    setSelectedPhoto={selectedPhoto.setSelectedPhoto}
                />
            )}
        </>
    );
};
