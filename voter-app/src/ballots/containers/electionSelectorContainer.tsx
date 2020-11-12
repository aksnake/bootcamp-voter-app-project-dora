import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { createBallot } from "../actions/ballotActions";
import { ElectionSelectorForm} from "../components/electionSelector";
import { VoterAppState } from "../../models/voterApp";
import { Election, Question } from '../../elections/models/election';

export function ElectionSelectorFormContainer() {

    //Dummy data till we use useEffect hook to pull elections data
    const questions1: Question[] = []
    const question1: Question = {id: 1, question:"1 + 1 === 2?"}
    const question2: Question = {id: 2, question:"1 * 0 === 0?"}
    questions1.push(question1);
    questions1.push(question2);
    const questions2: Question[] = [];
    questions2.push(question1);
    const election1: Election = {id: 1, questions: questions1};
    const election2: Election = {id: 2, questions: questions2};
    const elections: Election[] = [];
    elections.push(election1); 
    elections.push(election2); 


    const stateProps = useSelector((state: VoterAppState) => {
        return {
                elections: elections,//state.elections,
            };
        }) as {
            elections : Election[]; 
            selectedElectionId: number,
        };


    //TODO: This doesn't need any Backend action now, we need to display User Form for identifying (and validating) user.
    const boundActionProps =  bindActionCreators({
        onVoteRequest: createBallot,
    },
    useDispatch()
    );

    return <ElectionSelectorForm {...stateProps}{...boundActionProps} />
}