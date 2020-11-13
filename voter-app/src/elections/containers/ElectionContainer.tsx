import React, {useEffect, useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {ElectionTable} from '../components/ElectionTable';
import {ElectionQuestionContainer} from '../containers/ElectionQuestionContainer';
import {ElectionQuestionStoreProvider} from "../context/electionQuestionStoreContext";
import {ElectionStoreProvider} from "../context/electionStoreContext";
import {Election} from "../models/election";
import {Ballot} from "../../ballots/models/ballot"
import {VoterAppState} from "../../models/voterApp";
import {ToolHeader} from "../../components/ToolHeader";
import "../components/ElectionFlow.css";

import {refreshElections} from '../actions/electionToolActions';

export function ElectionContainer() {
    
    const stateProps = useSelector((state: VoterAppState) => {
        return {
          elections: state.elections,
          ballots: state.ballots,          
        };
      }) as { elections: Election[], ballots: Ballot[]; };
           

    
    const dispatch = useDispatch();
    useEffect(() => {
      refreshElections()(dispatch);
    }, [dispatch]);
    const boundActionProps = useMemo(
      () =>
        bindActionCreators(
          {
            onRefreshElection: refreshElections,
          },
          dispatch
        ),
      [dispatch]
    );

    const loadElectionsButton = stateProps.elections.length ?
    (<div/>) : (<button type="button" onClick={() => boundActionProps.onRefreshElection()}>Load Elections</button>);

    return (
            <div className="election">
                <br/>
                <hr/>
                <ToolHeader headerString="Election List"/>
                <ElectionStoreProvider>
                    <ElectionTable {...stateProps} />
                </ElectionStoreProvider>
                {loadElectionsButton}                
                <hr/>
                <ToolHeader headerString="Create New Election"/>
                <ElectionQuestionStoreProvider>
                    <ElectionQuestionContainer />
                </ElectionQuestionStoreProvider> 
                <hr/>           
            </div>
           );
};
