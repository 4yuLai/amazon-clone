import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LmdxIKpyoSfhizsvYDRtwlXhvl4E8ajhBWjr5k0y2iTOz50QNlXGeiusxP5Ti2slq2CHva9kGPNw7L72myWDOEH00hfDBpV0x');

function App() {
  const [{}, dispatch] = useStateValue();

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: '{{CLIENT_SECRET}}',
  // };

  // options = {options}

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
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
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
