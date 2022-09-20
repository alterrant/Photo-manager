import { GitHubSVG } from '../assets/svg/github';
import { DropDownMenu } from '../drop-down-menu';
import { ProfileAvatar } from '../profile-avatar';
import { SwitchPhotos } from '../switch-photos';

import './header.css';

export const Header = () => (
  <header>
    <div className="header-container">
      <GitHubSVG />
      <SwitchPhotos />
      <DropDownMenu>
        <ProfileAvatar avatarModifier="downArrow" />
      </DropDownMenu>
    </div>
  </header>
);
