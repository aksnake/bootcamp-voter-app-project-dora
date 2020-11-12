import { combineReducers } from "redux";
import { electionsReducer } from "./electionReducers";


export const voterAppReducer = combineReducers({
    elections: electionsReducer,
});