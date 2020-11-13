import {BallotActions, isRefreshBallotDoneAction, isVoteCastedAction, isCreateBallotRequestAction, isValidateUserRequestAction, isGoHomeAction} from "../actions/ballotActions";
import {Ballot} from "../models/ballot";
import { Reducer } from "redux";
import { UserValidationState } from "../models/ballotStore";

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
    if (isGoHomeAction(action)) {
        return '';
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
    if (isGoHomeAction(action)) {
        return -1;
    }
  
    return electionId;
  };

  export const selectedVoterIdReducer: Reducer<UserValidationState, BallotActions> = (
    userValidationState: UserValidationState = {voterId:-1, phoneNumber:''},
    action
  ) => {
    if(isValidateUserRequestAction(action)) {
        return action.payload.userValidation;
    }
    if (isGoHomeAction(action)) {
        return {voterId:-1, phoneNumber:''};
    }
  
    return userValidationState;
  };