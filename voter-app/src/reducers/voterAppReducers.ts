import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";
import { ballotsReducer, castVoteMessageReducer, selectedElectionIdReducer, selectedVoterIdReducer } from "../ballots/reducers/ballotReducers";

import {votersReducer} from "../voter/reducers/votersReducers";

export const voterAppReducer = combineReducers({
    voters: votersReducer,
    elections: electionsReducer,
    ballots: ballotsReducer,
    message: castVoteMessageReducer,
    selectedElectionId: selectedElectionIdReducer,
    selectedVoter: selectedVoterIdReducer,
});