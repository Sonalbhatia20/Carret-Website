import "./Temp.css";
import React from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import imgg from "./imgg.png";

const Temp = (props) => {
  return (
    <div className="App">
      <div className="App__Aside">
        <img className="image" src={imgg}></img>
      </div>
      <div className="App__Form">
        <div className="PageSwitcher">
          <NavLink
            to="/sign-in"
            activeClassName="PageSwitcher__Item--Active"
            className="PageSwitcher__Item"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/"
            activeClassName="PageSwitcher__Item--Active"
            className="PageSwitcher__Item"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="FormTitle">
          <NavLink
            to="/sign-in"
            activeClassName="FormTitle__Link--Active"
            className="FormTitle__Link"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact
            to="/"
            activeClassName="FormTitle__Link--Active"
            className="FormTitle__Link"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/portfolio"
            activeClassName="FormTitle__Link--Active"
            className="FormTitle__Link"
          >
            Portfolio
          </NavLink>
        </div>
        <Route exact path="/">
          <SignUpForm />
        </Route>
        <Route path="/sign-in">
          <SignInForm tokenHandle={props.tokenHandler} />
        </Route>
      </div>
    </div>
  );
};

export default Temp;
