import { GitHubSVG } from '../assets/svg/github';
import { SignOut } from '../auth/sign-out';

export const Header = () => {
    return (
        <header>
            <GitHubSVG />
            <SignOut />
        </header>
    );
};
