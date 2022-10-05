import { useNavigate } from 'react-router-dom';
import { GitHubSVG } from '../assets/svg/github';
import { DropDownMenu } from '../drop-down-menu';
import { ProfileAvatar } from '../profile-avatar';
import { SwitchPhotos } from '../switch-photos';
import { logOut } from '../../store/auth';
import { useAppDispatch } from '../../hooks/react-redux';

import './header.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuList = [
    { id: 1, clickHandler: () => navigate('/update-profile'), text: 'Update profile' },
    { id: 0, clickHandler: () => dispatch(logOut()), text: ' Sign Out' },
  ];

  return (
    <header>
      <div className="header-container">
        <GitHubSVG />
        <SwitchPhotos />
        <DropDownMenu menuList={menuList}>
          <ProfileAvatar avatarModifier="downArrow" />
        </DropDownMenu>
      </div>
    </header>
  );
};
