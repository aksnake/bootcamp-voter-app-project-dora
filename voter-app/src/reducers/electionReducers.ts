import {ElectionActions, isRefreshElectionDoneAction} from "../actions/electionToolActions";
import {Election} from "../models/election";
import { Reducer } from "redux";

export const electionsReducer: Reducer<Election[], ElectionActions> = (
                        elections: Election[] = [],
                        action ) => {

    if(isRefreshElectionDoneAction(action)) {
        return action.payload.elections;
    }
    return elections;
};
