import React, { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from './OpenModalMenuItem';

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

      <button className='no-button' onClick={openMenu}>
        <i className="fa-solid fa-bars"></i> <span className="category-text">&nbsp; Categories</span>
      </button>

      <ul className={ulClassName} ref={ulRef}>
        <li>Dairy</li>
        <li>Meat</li>
        <li>Other</li>
      </ul>
    </>
  );
}

export default CategoryButton;