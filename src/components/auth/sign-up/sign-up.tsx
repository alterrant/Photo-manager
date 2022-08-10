import { motion } from 'framer-motion';
import { Field, reduxForm } from 'redux-form';

import { InputLoginForm } from '../../common/form-control/input';
import { validate } from '../../common/form-control/validators';
import { useAppDispatch } from '../../../hooks';
import { sendRegistrationRequest } from '../../../store/registration';
import { RegistrationRequestTypes } from '../../../store/registration/types';

const SignUpForm = ({ handleSubmit, setRegistrationPage, error }: any) => {
    const dispatch = useAppDispatch();

    return (
        <form
            className='auth-form-container'
            onSubmit={handleSubmit((inputValues: RegistrationRequestTypes) =>
                dispatch(sendRegistrationRequest(inputValues)),
            )}
        >
            <span className='auth-form-title'>Sign up</span>
            <div className='auth-input-label'>Username</div>
            <Field className='auth-input' component={InputLoginForm} name='email' />
            <div className='auth-input-label'>Password</div>
            <Field
                className='auth-input'
                component={InputLoginForm}
                name='password'
                type='password'
            />
            <div className='auth-input-label'>Repeat password</div>
            <Field
                className='auth-input'
                component={InputLoginForm}
                name='repeatedPassword'
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
                    <p>Sign Up</p>
                </motion.button>
            </div>

            <div className='auth-signUp'>
                <p>
                    If a member,{' '}
                    <motion.span
                        className='auth-text-link'
                        onClick={() => setRegistrationPage(false)}
                        whileHover={{ color: 'rgb(78,65,113)' }}
                    >
                        sign in
                    </motion.span>
                </p>
            </div>
        </form>
    );
};

export const SignUp = () =>
    reduxForm({
        form: 'signUpForm',
        validate,
    })(SignUpForm);

export default reduxForm({
    form: 'signUpForm',
    validate,
})(SignUpForm);
