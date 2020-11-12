import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";
import { ballotsReducer } from "../ballots/reducers/ballotReducers";

import {votersReducer} from "../voter/reducers/votersReducers";

export const voterAppReducer = combineReducers({
    voters: votersReducer,
    elections: electionsReducer,
    ballots: ballotsReducer,
});