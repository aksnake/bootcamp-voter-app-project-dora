import {BallotActions, isRefreshBallotDoneAction} from "../actions/ballotActions";
import {Ballot} from "../models/ballot";
import { Reducer } from "redux";

export const ballotsReducer: Reducer<Ballot[], BallotActions> = (
                        ballots: Ballot[] = [],
                        action ) => {

    if(isRefreshBallotDoneAction(action)) {
        return action.payload.ballots;
    }
    return ballots;
};
