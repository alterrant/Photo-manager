import { motion } from 'framer-motion';
import { SetErrorType, SetProgressType } from '../../../store/photo-storage/types';

type ProgressBarTypes = {
  error: SetErrorType;
  progress: SetProgressType;
};

export const ProgressBar = ({ error, progress }: ProgressBarTypes) => {
  if (!error) {
    return (
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      />
    );
  }
  return null;
};
