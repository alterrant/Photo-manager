import { motion } from 'framer-motion';

type CloseSvgTypes = {
  onClick: () => void;
};

export const CloseSvg = ({ onClick }: CloseSvgTypes) => (
  <motion.svg
    className="delete-picture"
    onClick={onClick}
    opacity={0.7}
    whileHover={{ opacity: 1 }}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
  >
    <defs>
      <linearGradient
        id="linear0"
        gradientUnits="userSpaceOnUse"
        x1="113"
        y1="17.65625"
        x2="113"
        y2="208.81694"
        gradientTransform="matrix(0.106195,0,0,0.106195,0,0)"
      >
        <stop
          offset="0"
          style={{
            stopColor: 'rgb(89.803922%, 69.803923%, 79.215688%)',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="1"
          style={{
            stopColor: 'rgb(43.921569%, 15.686275%, 89.411765%)',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient
        id="linear1"
        gradientUnits="userSpaceOnUse"
        x1="113"
        y1="17.65625"
        x2="113"
        y2="208.81694"
        gradientTransform="matrix(0.106195,0,0,0.106195,0,0)"
      >
        <stop
          offset="0"
          style={{
            stopColor: 'rgb(89.803922%, 69.803923%, 79.215688%)',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="1"
          style={{
            stopColor: 'rgb(43.921569%, 15.686275%, 89.411765%)',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient
        id="linear2"
        gradientUnits="userSpaceOnUse"
        x1="113"
        y1="73.566528"
        x2="113"
        y2="150.777313"
        gradientTransform="matrix(0.106195,0,0,0.106195,0,0)"
      >
        <stop offset="0" style={{ stopColor: 'rgb(100%, 100%, 100%)', stopOpacity: 1 }} />
        <stop
          offset="1"
          style={{
            stopColor: 'rgb(69.803923%, 54.901963%, 94.509804%)',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <g id="surface28850912">
      <path
        style={{ stroke: 'none', fillRule: 'nonzero', fill: 'url(#linear0)' }}
        d="M 12 21.75 C 6.625 21.75 2.25 17.375 2.25 12 C 2.25 6.625 6.625 2.25 12 2.25 C 17.375 2.25 21.75 6.625 21.75 12 C 21.75 17.375 17.375 21.75 12 21.75 Z M 12 3 C 7.039062 3 3 7.039062 3 12 C 3 16.960938 7.039062 21 12 21 C 16.960938 21 21 16.960938 21 12 C 21 7.039062 16.960938 3 12 3 Z M 12 3 "
      />
      <path
        style={{ stroke: 'none', fillRule: 'nonzero', fill: 'url(#linear1)' }}
        d="M 12 19.5 C 7.863281 19.5 4.5 16.136719 4.5 12 C 4.5 7.863281 7.863281 4.5 12 4.5 C 16.136719 4.5 19.5 7.863281 19.5 12 C 19.5 16.136719 16.136719 19.5 12 19.5 Z M 12 5.25 C 8.277344 5.25 5.25 8.277344 5.25 12 C 5.25 15.722656 8.277344 18.75 12 18.75 C 15.722656 18.75 18.75 15.722656 18.75 12 C 18.75 8.277344 15.722656 5.25 12 5.25 Z M 12 5.25 "
      />
      <path
        style={{ stroke: 'none', fillRule: 'nonzero', fill: 'url(#linear2)' }}
        d="M 15.257812 9.273438 L 14.726562 8.738281 C 14.574219 8.585938 14.324219 8.585938 14.171875 8.738281 L 12 10.910156 L 9.828125 8.742188 C 9.675781 8.585938 9.425781 8.585938 9.273438 8.742188 L 8.742188 9.273438 C 8.585938 9.425781 8.585938 9.675781 8.742188 9.828125 L 10.910156 12 L 8.742188 14.171875 C 8.585938 14.324219 8.585938 14.574219 8.742188 14.726562 L 9.273438 15.257812 C 9.425781 15.414062 9.675781 15.414062 9.828125 15.257812 L 12 13.089844 L 14.171875 15.257812 C 14.324219 15.414062 14.574219 15.414062 14.726562 15.257812 L 15.257812 14.726562 C 15.414062 14.574219 15.414062 14.324219 15.257812 14.171875 L 13.089844 12 L 15.257812 9.828125 C 15.414062 9.675781 15.414062 9.425781 15.257812 9.273438 Z M 15.257812 9.273438 "
      />
    </g>
  </motion.svg>
);
