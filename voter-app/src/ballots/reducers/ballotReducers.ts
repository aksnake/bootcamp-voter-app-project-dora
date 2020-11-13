import {BallotActions, isRefreshBallotDoneAction, isVoteCastedAction, isCreateBallotRequestAction} from "../actions/ballotActions";
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
export const castVoteMessageReducer: Reducer<string, BallotActions> = (
    message = '',
    action
  ) => {
    if(isVoteCastedAction(action)) {
        return action.payload.message;
    }
  
    return message;
  };

  export const selectedElectionIdReducer: Reducer<number, BallotActions> = (
    electionId = -1,
    action
  ) => {
    if(isCreateBallotRequestAction(action)) {
        return action.payload.electionId;
    }
  
    return electionId;
  };