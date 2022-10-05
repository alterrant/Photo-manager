import { useState, ReactNode, useRef, useEffect } from 'react';
import classNames from 'classnames';

import './drop-down-menu.css';

type MenuListItem = {
  id: number;
  text: string;
  clickHandler: () => void;
};
type DropDownMenuTypes = {
  children: ReactNode;
  menuList: MenuListItem[];
};

export const DropDownMenu = ({ children, menuList }: DropDownMenuTypes) => {
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const [dropDownState, setDropDownState] = useState({ open: false });

  const handleDropDownClick = () => setDropDownState({ open: !dropDownState.open });

  const menuLists = menuList.map((item, index) => (
    <li
      key={item.id}
      onClick={item.clickHandler}
      className={classNames(
        'drop-down-menu__item',
        index === menuList.length - 1 && 'drop-down-menu__last-item'
      )}
    >
      {item.text}
    </li>
  ));

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
          {menuLists}
        </ul>
      )}
    </div>
  );
};
