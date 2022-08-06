import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addNewPhoto } from '../../../store/photo-storage';

export const ProgressBar = ({ file, setFile }: any) => {
    const userId = useAppSelector((state) => state.auth.authUserProfile.uid);
    const dispatch = useAppDispatch();

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        dispatch(addNewPhoto({ userId, file, setProgress, setError, setUrl }));
    }, [dispatch, userId, file]);

    useEffect(() => {
        if (url) setFile(null);
    }, [url, setFile]);

    if (!error)
        return (
            <motion.div
                className='progress-bar'
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
            />
        );
    return <div>empty</div>;
};
