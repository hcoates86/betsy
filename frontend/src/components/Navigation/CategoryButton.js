import React, { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from './OpenModalMenuItem';
import { NavLink } from 'react-router-dom';


function CategoryButton() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "category" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="hover-focus">
      <button className='no-button nav-button-padding' onClick={openMenu}>
        <i className="fa-solid fa-bars"></i> <span className="category-text">&nbsp; Categories</span>
      </button>
    </div>
    
      <ul className={ulClassName} ref={ulRef}>
        <li className="category-li">
          <NavLink exact to="/category/1">Dairy</NavLink>          
        </li>
        <li className="category-li">
          <NavLink className='' exact to="/category/2">Beef</NavLink>
        </li>
        <li className="category-li">
          <NavLink className='' exact to="/category/3">Other</NavLink>
        </li>
        <li className="category-li">
        <NavLink id='all-cow' exact to="/listings">All Cows</NavLink>
        </li>
      </ul>
    </>
  );
}

export default CategoryButton;