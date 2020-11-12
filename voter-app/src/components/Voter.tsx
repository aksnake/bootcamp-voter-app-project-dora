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
      <div>Register as a New Voter </div>
      <Switch>
        <Route path={routeMatch.path + "/register"}>
          <div><RegistrationFormContainer /></div>
        </Route>
      </Switch>
      <button type="button" className='back-button' onClick={() => history.push("/")}>
       Complete Registration
      </button>
    </div>
  );
};
