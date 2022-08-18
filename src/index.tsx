import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/auth';
import { store } from './store';
import SignIn from './components/auth/sign-in/sign-in';
import SignUp from './components/auth/sign-up/sign-up';
import { MainPage } from './pages/main';
import { PrivateRoute } from './components/private-route';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route
                        path='/auth'
                        element={
                            <AuthPage>
                                <SignIn />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/registration'
                        element={
                            <AuthPage>
                                <SignUp />
                            </AuthPage>
                        }
                    />
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                        {/* <Route path='*' element='PageNotFound' /> */}
                    </Route>
                </Routes>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
