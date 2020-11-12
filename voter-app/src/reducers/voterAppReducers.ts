import { combineReducers } from "redux";
import {electionsReducer} from "../elections/reducers/electionReducers";


export const voterAppReducer = combineReducers({
    elections: electionsReducer,
});