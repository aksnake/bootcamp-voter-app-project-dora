import React from "react";
import {useHistory} from "react-router-dom";
import "./VoterApp.css";
import {Provider} from 'react-redux';
import {ElectionContainer} from '../elections/containers/ElectionContainer';
import {voterAppStore} from "../stores/voterAppStore";

export const Election = () => {
  const history = useHistory();
  return (
    <div>
      <button type="button" className='back-button' onClick={() => history.push("/")}>
        Go Home
      </button>
      <div>
        <Provider store={voterAppStore}>
            <ElectionContainer />
         </Provider>,
      </div>
    </div>
  );
};
