import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
import { SnapshotPhotosData } from '../../store/photo-storage/types';
import { DOC_PATH } from '../../store/photo-storage/constants';
import { auth } from '../../selectors';
import { useAppSelector } from '../../hooks/react-redux';
import defaultAvatarUrl from './assets/default-avatar.svg';
import photoChanger from './assets/photo-changer.svg';
import downArrow from './assets/down-arrow.svg';

import './profile-avatar.css';

type ProfileAvatarTypes = {
  avatarModifier?: 'downArrow' | 'pencil';
};

export const ProfileAvatar = ({ avatarModifier }: ProfileAvatarTypes) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const { authUserProfile } = useAppSelector(auth);
  const isPencilModifier = avatarModifier === 'pencil';

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
      {avatarModifier && (
        <img
          className={`avatar-modifier modifier-${avatarModifier}`}
          src={isPencilModifier ? (photoChanger as string) : (downArrow as string)}
          alt="avatar-modifier"
        />
      )}
    </div>
  );
};
