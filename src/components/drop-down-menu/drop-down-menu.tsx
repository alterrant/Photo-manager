import { useState, ReactNode, useRef, useEffect } from 'react';

import { logOut } from '../../store/auth';
import { useAppDispatch } from '../../hooks/react-redux';

import './drop-down-menu.css';

type DropDownMenuTypes = {
  children: ReactNode;
};

export const DropDownMenu = ({ children }: DropDownMenuTypes) => {
  const dropDownMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const [dropDownState, setDropDownState] = useState({ open: false });

  const handleDropDownClick = () => setDropDownState({ open: !dropDownState.open });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownState.open &&
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target as Node)
      ) {
        setDropDownState({ open: false });

        if (window.innerWidth < 450) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [dropDownState.open]);

  return (
    <div className="drop-down-menu-wrapper" ref={dropDownMenuRef}>
      <button className="drop-down-menu-button" onClick={handleDropDownClick}>
        {children}
      </button>
      {dropDownState.open && (
        <ul className="drop-down-menu-container">
          <li className="drop-down-menu__first-item" />
          <hr className="drop-down-menu__divide-line" />
          <li
            onClick={() => dispatch(logOut())}
            className="drop-down-menu__last-item drop-down-menu__item"
          >
            Sign Out
          </li>
        </ul>
      )}
    </div>
  );
};
