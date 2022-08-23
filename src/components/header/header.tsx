import { GitHubSVG } from '../assets/svg/github';
import { SignOut } from '../auth/sign-out';

export const Header = () => (
  <header>
    <GitHubSVG />
    <SignOut />
  </header>
);
