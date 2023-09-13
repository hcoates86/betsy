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
          <Route path='/listings/:productId'>
            <SingleListing />
          </Route>
          <Route>
            <NoPage />
          </Route>
        </Switch>}
    </>
  );
}

export default App;