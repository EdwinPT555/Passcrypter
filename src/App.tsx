import React from "react";
import IntroPage from "./pages/1_IntroPage/IntroPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./pages/2_Authentication/SignUpPage";
import LoginPage from "./pages/2_Authentication/LoginPage";

const App: React.FC<IProps> = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

interface IProps {}
