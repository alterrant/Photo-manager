import { AuthLoginList } from './auth-login-list';

export const Auth = () => {
    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-content'>
                    <AuthLoginList />
                </div>
            </div>
        </div>
    );
};
