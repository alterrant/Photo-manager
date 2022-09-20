import { Dispatch, SetStateAction } from 'react';
import { GitHubSVG } from '../assets/svg/github';
import { DropDownMenu } from '../drop-down-menu';

import { ProfileAvatar } from '../profile-avatar';
import { SwitchPhotos } from '../switch-photos';

import './header.css';

type HeaderTypes = {
  isLookingMyPhotos: boolean;
  watchPhotosToggle: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ isLookingMyPhotos, watchPhotosToggle }: HeaderTypes) => (
  <header>
    <div className="header-container">
      <GitHubSVG />
      <SwitchPhotos isLookingMyPhotos={isLookingMyPhotos} watchPhotosToggle={watchPhotosToggle} />
      <DropDownMenu>
        <ProfileAvatar avatarModifier="downArrow" />
      </DropDownMenu>
    </div>
  </header>
);
