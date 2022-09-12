import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
import { SnapshotPhotosData } from '../../store/photo-storage/types';
import { DOC_PATH } from '../../store/photo-storage/constants';
import { auth } from '../../selectors';
import { useAppSelector } from '../../hooks/react-redux';
import defaultAvatarUrl from './assets/default-avatar.svg';
import photoChanger from './assets/photo-changer.svg';

import './profile-avatar.css';

export const ProfileAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const { authUserProfile } = useAppSelector(auth);

  useEffect(() => {
    return onSnapshot(
      doc(projectFirestore, DOC_PATH.getUserPath(authUserProfile.uid), 'profileAvatar'),
      querySnapshot => {
        if (querySnapshot.data()) {
          const { imageUrl } = querySnapshot.data() as SnapshotPhotosData;

          setAvatarUrl(imageUrl);
        }
      }
    );
  }, [authUserProfile.uid]);

  return (
    <div className="avatar-img-container">
      <img
        className="avatar-img"
        src={avatarUrl || (defaultAvatarUrl as string)}
        alt="profile-avatar"
      />
      <img className="avatar-changer" src={photoChanger as string} alt="avatar-changer" />
    </div>
  );
};
