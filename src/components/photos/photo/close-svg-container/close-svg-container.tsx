import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deletePhoto } from '../../../../store/photo-storage';
import { CloseSvg } from '../../../assets/svg/close';

export const CloseSvgContainer = ({ imageName, imageFirebaseId }: any) => {
    const userId = useAppSelector((state) => state.auth.authUserProfile.uid);
    const dispatch = useAppDispatch();

    const handleDeletePhoto = () => {
        dispatch(deletePhoto({ imageName, imageFirebaseId, userId }));
    };

    return (
        <div onClick={() => handleDeletePhoto()}>
            <CloseSvg />
        </div>
    );
};
