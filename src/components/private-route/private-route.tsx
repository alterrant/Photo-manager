import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { authObserver } from '../../utils/auth';
import { auth } from '../../selectors';
import { Preloader } from '../common/preloader';

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;
  const { isAuth } = useAppSelector(auth);

  useEffect(() => {
    authObserver({ dispatch, navigate, path });
  }, [path, navigate, dispatch]);

  if (isAuth) return <Outlet />;
  return <Preloader />;
};
