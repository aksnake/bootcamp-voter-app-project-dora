import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";
import {voterReducer} from "../voter/reducers/voterReducers";

export const voterAppReducer = combineReducers({
    voter: voterReducer,
    elections: electionsReducer,
});