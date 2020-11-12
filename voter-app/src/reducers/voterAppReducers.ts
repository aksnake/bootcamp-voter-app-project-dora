import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";
import { ballotsReducer } from "../ballots/reducers/ballotReducers";


export const voterAppReducer = combineReducers({
    elections: electionsReducer,
    ballots: ballotsReducer,
});