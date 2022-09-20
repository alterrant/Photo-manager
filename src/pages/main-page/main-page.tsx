import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header';

import './main-page.css';

export const MainPage = () => {
  const [isLookingMyPhotos, watchPhotosToggle] = useState<boolean>(true);

  return (
    <div className="main-wrapper">
      <Header isLookingMyPhotos={isLookingMyPhotos} watchPhotosToggle={watchPhotosToggle} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
