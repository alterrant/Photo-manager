import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';

const svgVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

type SVGLoaderType = {
  width?: string;
  height?: string;
  color?: string;
};

export const SVGLoader = ({
  width = '24px',
  height = '24px',
  color = 'rgb(102,102,255)',
}: SVGLoaderType) => {
  const [isHovered, setHovered] = useState('rgb(102,102,255)');

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <motion.svg
        width={width}
        height={height}
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 2 }}
        onHoverStart={() => {
          setHovered('#ad78e2');
        }}
        onHoverEnd={() => {
          setHovered('rgb(102,102,255)');
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        enable-background="new 0 0 512 512"
      >
        <motion.path
          animate={{ fill: isHovered }}
          d="M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,460.2
                c-112.6,0-204.2-91.6-204.2-204.2S143.4,51.8,256,51.8S460.2,143.4,460.2,256S368.6,460.2,256,460.2z"
          fill={color}
        />

        <motion.path
          animate={{ fill: isHovered }}
          d="m357.6,235.6h-81.2v-81.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v81.2h-81.2c-11.3,
            0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h81.2v81.2c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-81.2h81.2c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z"
          fill={color}
        />
      </motion.svg>
    </MotionConfig>
  );
};
