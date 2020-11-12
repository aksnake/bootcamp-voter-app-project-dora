import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";
import { ballotsReducer } from "../ballots/reducers/ballotReducers";

import {voterReducer} from "../voter/reducers/voterReducers";

export const voterAppReducer = combineReducers({
    voter: voterReducer,
    elections: electionsReducer,
    ballots: ballotsReducer,
});