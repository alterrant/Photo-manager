import { Header } from '../../components/header';
import { Main } from '../../components/main';

import './app.css';

export const MainPage = () => {
    return (
        <div className='main-wrapper'>
            <Header />
            <Main />
        </div>
    );
};
