import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deletePhotoAttempt } from '../../../../store/photo-storage';
import { CloseSvg } from '../../../assets/svg/close';

type CloseSvgContainerTypes = {
    imageName: string;
    imageFirebaseId: string;
};

export const CloseSvgContainer = ({ imageName, imageFirebaseId }: CloseSvgContainerTypes) => {
    const userId = useAppSelector((state) => state.auth.authUserProfile.uid);
    const dispatch = useAppDispatch();

    const handleDeletePhoto = () =>
        dispatch(deletePhotoAttempt({ userId, imageName, imageFirebaseId }));

    return (
        <div onClick={handleDeletePhoto}>
            <CloseSvg />
        </div>
    );
};
