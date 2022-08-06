import { Header } from './components/header';
import { Main } from './components/main';

import './app.css';

export const App = () => {
    return (
        <div className='main-wrapper'>
            <Header />
            <Main />
        </div>
    );
};
