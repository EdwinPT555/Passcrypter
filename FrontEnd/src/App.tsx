import React, { useContext, useEffect, useMemo } from "react";
import IntroPage from "./pages/1_IntroPage/IntroPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SignUpPage from "./pages/2_Authentication/SignUpPage";
import LoginPage from "./pages/2_Authentication/LoginPage";
import Home from "./pages/3_Home/Home";
import AppProvider from "./AppProvider";
import AppContext from "./AppContext";
import AccessDenied from "./pages/AccessDenied";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routing />
      </Router>
    </AppProvider>
  );
};

export default App;

const Routing = () => {
  const history = useHistory();
  const { user } = useContext(AppContext);

  const _user = useMemo(() => {
    return user;
  }, [user]);

  useEffect(() => {
    if (!(Object.keys(user).length === 0)) {
      history.push("/home");
      return;
    }
    history.push("/");
  }, [user, history]);

  return (
    <Switch>
      <Route exact path="/" component={IntroPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/home" component={Home} />
      <Route path="/access_denied" component={AccessDenied} />
    </Switch>
  );
};
