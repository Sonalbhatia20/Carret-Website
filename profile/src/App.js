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
import Portf from "./portfolio/Portf";
import { useState } from "react";
import Temp from "./Temp";

import "./App.css";

const App = () => {
  const [token, setToken] = useState({});
  function handleTransfer(tokenJson) {
    setToken(tokenJson);
  }
  return (
    <Router basename="/">
      <div className="AppTop">
        <Switch>
          <Route path="/" exact>
            <Temp tokenHandler={handleTransfer} />
          </Route>
          <Route path="/sign-in">
            <Temp />
          </Route>
          <Route path="/portfolio">
            <Portf tokenid={token} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
