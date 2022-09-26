import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from "./Login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";


function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(()=> {
    //will only run once when the app component loads
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('THE USER IS>>> ', user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch({
          type: 'SET_USER',
          user: user
        })
        // ...
      } else {
        // User is signed out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
