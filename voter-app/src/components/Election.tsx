import React from "react";
import {useHistory} from "react-router-dom";
import "./VoterApp.css";

export const Election = () => {
  const history = useHistory();
  return (
    <div>
      <button type="button" className='back-button' onClick={() => history.push("/")}>
        Go Home
      </button>
      <div>Elections</div>
    </div>
  );
};
