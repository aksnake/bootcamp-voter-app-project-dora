import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { createCreateBallotRequestAction } from "../actions/ballotActions";
import { ElectionSelectorForm} from "../components/electionSelector";
import { VoterAppState } from "../../models/voterApp";
import { Ballot } from '../models/ballot';
import { Election } from '../../elections/models/election';
// import { CarToolState } from "../models/carStore";
// import { Car } from '../models/car';
//import { CarFormTool } from '../components/CarFormTool';



// type CarKeys = keyof Car;// "make" | "model" | "year" | "color" | "price";
export function ElectionSelectorFormContainer() {
    const stateProps = useSelector((state: VoterAppState) => {
        return {
                //result: computeResult(state.calcToolHistory),
                elections: state.elections,
            };
        }) as {
            elections : Election[]; 
            selectedElectionId: number,
        };
    const elections = [];

    //It will produce
    //onAdd = (value: number) => dispatch(createAddAction(value));
    const boundActionProps =  bindActionCreators({
        onVoteRequest: createCreateBallotRequestAction,
    },
    useDispatch()
    );

    return <ElectionSelectorForm {...stateProps}{...boundActionProps} />
}