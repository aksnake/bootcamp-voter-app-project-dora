import React from "react";
import {
    useParams,
    useHistory,
    Route,
    Switch,
    useRouteMatch,
  } from "react-router-dom";
import { VoterRegistrationContainer } from "../voters/containers/VoterRegistrationContainer"
import { VotersTableContainer } from "../voters/containers/VotersTableContainer"

export const Voter = () => {
    const history = useHistory();

    const routeMatch = useRouteMatch();
  return (
    <div>
      
      <Switch>
        <Route path={routeMatch.path + "/register"}>
          <div>Register as a New Voter </div>
          <div><VoterRegistrationContainer /></div>
          <button type="button" className='back-button' onClick={() => history.push("/")}> Complete Registration </button>
        </Route>
        <Route path={routeMatch.path + "/list"}>
          <div><VotersTableContainer /></div>
        </Route>
      </Switch>
    </div>
  );
};
