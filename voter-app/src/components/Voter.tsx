import React from "react";
import {
    useParams,
    useHistory,
    Route,
    Switch,
    useRouteMatch,
  } from "react-router-dom";

export const Voter = () => {
    const history = useHistory();

    const routeMatch = useRouteMatch();
  return (
    <div>
      Voter
      <br />
      <br />
      <button type="button" onClick={() => history.push("/")}>
        Go Home
      </button>
      <Switch>
        <Route path={routeMatch.path + "/register"}>
          <div>Register Voter</div>
        </Route>
      </Switch>
    </div>
  );
};
