import React from "react";
import {useHistory} from "react-router-dom";
import "../../components/VoterApp.css";

export const Ballot = () => {
  const history = useHistory();
  return (
    <div>
      <button type="button" className='back-button' onClick={() => history.push("/")}>
        Go Home
      </button>
      <div>Select an Election to vote</div>
    </div>
  );
};
