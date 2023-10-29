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
        <NavLink className='betsy' exact to="/">Betsy</NavLink>
      </li>
      <li>
        <NavLink exact to="/listings">All Cow Listings</NavLink>
      </li>

      {sessionUser ? (
        <>
        <li>
          <NavLink exact to='/new-listing'><i className="fa-solid fa-cow"></i><i className="fa-solid fa-plus fa-2xs"></i></NavLink>
        </li>
        <li>
          <NavLink exact to='/user/listings'>My Herd</NavLink>
        </li>
        <li>
          <NavLink exact to='/cart'><i className="fa-solid fa-cart-shopping"></i></NavLink>
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