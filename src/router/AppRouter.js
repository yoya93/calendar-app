import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { startChecking } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { cheking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return cheking ? (
    <h3>loading...</h3>
  ) : (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLoggedIn={!!uid}
            exact
            path="/login"
            component={LoginScreen}
          />

          <PrivateRoute
            isLoggedIn={!!uid}
            path="/"
            component={CalendarScreen}
          />
        </Switch>
      </div>
    </Router>
  );
};
