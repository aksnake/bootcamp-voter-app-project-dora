import React, {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {ElectionTable} from '../components/ElectionTable';
import {ElectionQuestionContainer} from '../containers/ElectionQuestionContainer';
import {ElectionQuestionStoreProvider} from "../context/electionQuestionStoreContext";
import {Election} from "../models/election";
import {VoterAppState} from "../../models/voterApp";
import {ToolHeader} from "../../components/ToolHeader";
import "../components/ElectionFlow.css";

import {refreshElections} from '../actions/electionToolActions';

export function ElectionContainer() {
    
    const stateProps = useSelector((state: VoterAppState) => {
        return {
          elections: state.elections,
        };
      }) as { elections: Election[]; };
     
    const dispatch = useDispatch();

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

    return (
            <div className="election">
                <ToolHeader headerString="Election List"/>
                <ElectionTable {...stateProps} {...boundActionProps}/>
                <button type="button" onClick={() => boundActionProps.onRefreshElection()}>Load Elections</button>
                
                <ToolHeader headerString="Create New Election"/>
                <ElectionQuestionStoreProvider>
                    <ElectionQuestionContainer />
                </ElectionQuestionStoreProvider>            
            </div>
           );
};
