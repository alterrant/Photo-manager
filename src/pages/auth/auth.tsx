import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { auth } from '../../selectors';
import { authObserver } from '../../utils/auth';

type AuthPagePropertiesTypes = {
  children: ReactNode;
};

export const AuthPage = ({ children }: AuthPagePropertiesTypes) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(auth);

  useEffect(() => {
    authObserver({ dispatch, navigate, path });
  }, [path, dispatch, navigate, isAuth]);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-content">{children}</div>
      </div>
    </div>
  );
};
