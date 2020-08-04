import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Products from "views/examples/Products.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import ProfileEdit from "views/examples/ProfileEdit.js";
import Register from "views/examples/Register.js";
import AboutUs from "views/examples/AboutUs.js";
import Paypal from "views/examples/Paypal.js";
import PaypalError from "views/examples/PaypalError.js";
import Detail from "views/examples/Detail.js";
import ProductDetail from "views/examples/ProductDetail.js";
import MyShopping from "views/examples/MyShopping.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />
      <Route
        path="/products-page"
        exact
        render={props => <Products {...props} />}
      />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />
      <Route
        path="/profileedit-page"
        exact
        render={props => <ProfileEdit {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      
      <Route
        path="/aboutus-page"
        exact
        render={props => <AboutUs {...props} />}
      />
      
      <Route
        path="/paypal-page"
        exact
        render={props => <Paypal {...props} />}
      />
      
      <Route
        path="/paypalerror-page"
        exact
        render={props => <PaypalError {...props} />}
      />
      
      <Route
        path="/detail-page/:productId?"
        exact
        render={props => <Detail {...props} />}
      />
      
      <Route
        path="/myshopping-page"
        exact
        render={props => <MyShopping {...props} />}
      />
      <Route
        path="/product-detail"
        exact
        render={props => <ProductDetail {...props} />}
      />
      
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
