import { AuthLoginList } from './auth-login-list';

function Auth() {
    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-content'>
                    <AuthLoginList />
                </div>
            </div>
        </div>
    );
}

export default Auth;
