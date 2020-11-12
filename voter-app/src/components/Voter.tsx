import React from "react";
import {
    useParams,
    useHistory,
    Route,
    Switch,
    useRouteMatch,
  } from "react-router-dom";
import { RegistrationFormContainer } from "../voter/containers/RegistrationFormContainer"

export const Voter = () => {
    const history = useHistory();

    const routeMatch = useRouteMatch();
  return (
    <div>
      
      <Switch>
        <Route path={routeMatch.path + "/register"}>
          <div>Register as a New Voter </div>
          <div><RegistrationFormContainer /></div>
          <button type="button" className='back-button' onClick={() => history.push("/")}> Complete Registration </button>
        </Route>
        <Route path={routeMatch.path + "/list"}>
          <div> List All Voters </div>
        </Route>
      </Switch>
    </div>
  );
};
