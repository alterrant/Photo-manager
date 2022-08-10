import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';

import { logOut } from '../../../store/auth';

export const SignOut = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <motion.button
                className='buttonLogOut'
                whileHover={{
                    boxShadow: `3px 3px 3px rgba(63, 44, 138, 0.49)`,
                }}
                onClick={() => dispatch(logOut())}
            >
                Sign Out
            </motion.button>
        </div>
    );
};
