import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/auth';
import { store } from './store';
import { MainPage } from './pages/main-page';
import { PrivateRoute } from './components/private-route';
import { RegistrationForm } from './components/forms/registration-form';
import { LoginForm } from './components/forms/login-form';
import { UpdateProfileForm } from './components/forms/update-profile-form';
import { UserPhotos } from './components/user-photos';
import { CommonPhotos } from './components/common-photos';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthPage>
                <LoginForm />
              </AuthPage>
            }
          />
          <Route
            path="/registration"
            element={
              <AuthPage>
                <RegistrationForm />
              </AuthPage>
            }
          />
          <Route
            path="/update-profile"
            element={
              <AuthPage>
                <UpdateProfileForm />
              </AuthPage>
            }
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />}>
              <Route path="my-photos" element={<UserPhotos />} />
              <Route path="common-photos" element={<CommonPhotos />} />
            </Route>
            {/* <Route path='*' element='PageNotFound' /> */}
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.querySelector('#root')
);
