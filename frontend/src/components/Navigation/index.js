// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <li>
        <NavLink exact to="/">Betsy</NavLink>
      </li>

      {sessionUser ? (
        <>
        <li>
          <NavLink exact to='/new-listing'><i className="fa-solid fa-cow"></i><i className="fa-solid fa-plus fa-2xs"></i></NavLink>
        </li>
        <li>
          <NavLink exact to='/user/listings'>My Herd</NavLink>
        </li>
        </>

      ) : (<></>)}

     
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;