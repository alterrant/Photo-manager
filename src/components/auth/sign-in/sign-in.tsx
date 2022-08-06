import { motion } from 'framer-motion';
import { Field, reduxForm } from 'redux-form';

import { logInGitHub, logInGoogle } from '../../../utils/auth';
import { logIn } from '../../../store/auth';
import { InputLoginForm } from '../../common/form-control/input';
import { validate } from '../../common/form-control/validators';
import { useAppDispatch } from '../../../hooks';
import { GitHubSVG } from '../../assets/svg/github';

const SignInForm = ({ handleSubmit, error, signUpForm }: any) => {
    const dispatch = useAppDispatch();
    const signInFunc = async ({ email, password }: any) => {
        await dispatch(logIn({ email, password }));
    };

    return (
        <form className='auth-form-container' onSubmit={handleSubmit(signInFunc)}>
            <span className='auth-form-title'>Sign In With</span>

            <div className='login-button-wrapper'>
                <motion.div
                    onClick={logInGitHub}
                    className='auth-github login-button'
                    transition={{ duration: 0.3 }}
                    whileHover={{
                        boxShadow: '0px 4px 8px 0px rgba(31, 69, 112, 1)',
                        textShadow: '0px 0px 1px rgba(31, 69, 112, 1)',
                    }}
                >
                    <GitHubSVG />
                    GitHub
                </motion.div>
                <motion.div
                    onClick={logInGoogle}
                    className='auth-google login-button'
                    transition={{ duration: 0.3 }}
                    whileHover={{
                        boxShadow: '0px 4px 8px 0px rgba(31, 69, 112, 1)',
                        textShadow: '0px 0px 1px rgba(31, 69, 112, 1)',
                    }}
                >
                    Google
                </motion.div>
            </div>
            <div className='auth-input-label'>Email</div>
            <Field className='auth-input' component={InputLoginForm} name='email' />
            <div className='auth-input-label'>Password</div>
            <Field
                className='auth-input'
                component={InputLoginForm}
                name='password'
                type='password'
            />
            <div className='form-error-wrapper'>
                <div className='form-error'>{error}</div>
            </div>
            <div className='auth-submit-container'>
                <motion.button
                    className='auth-submit-button'
                    type='submit'
                    transition={{ duration: 0.3 }}
                    whileHover={{
                        boxShadow: '0px 4px 8px 0px rgba(31, 69, 112, 1)',
                        textShadow: '0px 0px 1px rgba(120, 120, 158, 0.74)',
                    }}
                >
                    <p>Sign In</p>
                </motion.button>
            </div>
            <div className='auth-signUp'>
                <p>
                    Not a member?{' '}
                    <motion.span
                        className='auth-text-link'
                        onClick={signUpForm}
                        whileHover={{ color: 'rgb(78,65,113)' }}
                    >
                        Sign up now
                    </motion.span>
                </p>
            </div>
        </form>
    );
};

export const SignIn = () =>
    reduxForm({
        form: 'signInForm',
        validate,
    })(SignInForm);
