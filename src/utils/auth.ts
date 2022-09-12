import { UserInfo } from '@firebase/auth';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logInSuccess } from '../store/auth';

export const getUserProfile = (user: UserInfo) => {
  const { providerId, photoURL, phoneNumber, email, displayName, uid } = user;
  return {
    providerId,
    photoURL,
    phoneNumber,
    email,
    displayName,
    uid,
  };
};

export const authObserver = ({
  dispatch,
  navigate,
  path,
}: {
  dispatch: Dispatch;
  navigate: NavigateFunction;
  path: string;
}) => {
  const auth = getAuth();

  onAuthStateChanged(auth, currentUser => {
    if (currentUser !== null) {
      const userProfile = getUserProfile(currentUser);

      dispatch(logInSuccess(userProfile));

      switch (path) {
        case '/auth': {
          navigate('/');
          break;
        }
        case '/registration': {
          navigate('/update-profile');
          break;
        }
        case '/update-profile':
        case '/': {
          break;
        }
        default: {
          navigate('/auth');
          break;
        }
      }
    } else if (path === '/') navigate('/auth');
  });
};
