import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ListingForm from './components/ListingForm';
import SingleListing from './components/SingleListing';
import NoPage from "./components/NoPage";
import UserListings from "./components/UserListings";
import AllListings from "./components/AllListings";
import Cart from "./components/Cart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path='/new-listing'>
            <ListingForm />
          </Route>
          <Route exact path='/listings/:productId'>
            <SingleListing />
          </Route>
          <Route exact path='/user/listings/:productId'>
            <ListingForm />
          </Route>
          <Route path='/user/listings'>
            <UserListings />
          </Route>
          <Route exact path='/listings'>
            <AllListings />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          

          <Route>
            <NoPage />
          </Route>
        </Switch>}
    </>
  );
}

export default App;