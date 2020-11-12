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
      <div>Voters</div>
      {/* Do we need to register for each election?*/}
      <Switch>
        <Route path={routeMatch.path + "/register"}>
          <div>Complete Registration</div>
        </Route>
      </Switch>
      <button type="button" className='back-button' onClick={() => history.push("/")}>
        Go Home
      </button>
    </div>
  );
};
