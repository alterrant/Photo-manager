import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header';

import './main-page.css';

export const MainPage = () => (
  <div className="main-wrapper">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);
