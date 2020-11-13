import { Action, AnyAction, Dispatch } from "redux";
import {refreshBallots} from "../../ballots/actions/ballotActions"

import { NewElection, Election } from "../models/election";

export const ADD_ELECTION_ACTION = "ADD";
export const VIEW_ELECTION_RESULTS_ACTION = "VIEW_RESULTS";

export const REFRESH_ELECTION_REQUEST_ACTION = "REFRESH_ELECTION_REQUEST_ACTION";
export const REFRESH_ELECTION_DONE_ACTION = "REFRESH_ELECTION_DONE_ACTION";

export type RefreshElectionRequestAction = Action<
  typeof REFRESH_ELECTION_REQUEST_ACTION
>;

export function isRefreshElectionRequestAction(
  action: AnyAction
): action is RefreshElectionRequestAction {
  return action.type === REFRESH_ELECTION_REQUEST_ACTION;
}

export type CreateRefreshElectionRequestAction = () => RefreshElectionRequestAction;

export const createRefreshElectionRequestAction: CreateRefreshElectionRequestAction = () => {
  return {
    type: REFRESH_ELECTION_REQUEST_ACTION,
  };
};

export interface RefreshElectionDoneAction
  extends Action<typeof REFRESH_ELECTION_DONE_ACTION> {
  payload: {
    elections: Election[];
  };
}

export function isRefreshElectionDoneAction(
  action: AnyAction
): action is RefreshElectionDoneAction {
  return action.type === REFRESH_ELECTION_DONE_ACTION;
}

export type CreateRefreshElectionDoneAction = (
  elections: Election[]
) => RefreshElectionDoneAction;

export const createRefreshElectionDoneAction: CreateRefreshElectionDoneAction = (
  elections
) => {
  return {
    type: REFRESH_ELECTION_DONE_ACTION,
    payload: {
      elections,
    },
  };
};

export const refreshElections = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshElectionRequestAction());
    return fetch("http://localhost:3060/elections")
      .then((res) => res.json())
      .then((elections) => {
          dispatch(createRefreshElectionDoneAction(elections));
          refreshBallots() (dispatch);
      });
  };
};

export const addElection = (election: NewElection) => {
    console.log("Adding Election " + election.questions);
  return (dispatch: Dispatch) => {
    dispatch(createAddElectionAction(election));
    console.log("HEre?");
    return fetch("http://localhost:3060/elections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify(election),
    }).then((res) => res.json()).then((election) => {
      console.log("Election Added =" + election.id);
      refreshElections() (dispatch);
    });
  };
};

export interface AddElectionAction extends Action<typeof ADD_ELECTION_ACTION> {
  payload: {
    election: NewElection;
  };
}

export function isAddElectionAction(action: AnyAction): action is AddElectionAction {
  return action.type === ADD_ELECTION_ACTION;
}

export type CreateAddElectionAction = (election: NewElection) => AddElectionAction;

export const createAddElectionAction: CreateAddElectionAction = (election) => {
  return {
    type: ADD_ELECTION_ACTION,
    payload: {
      election,
    },
  };
};

export const viewElectionResults = (electionId: number) => {
    console.log("Viewing Election results" + electionId);
    return (dispatch: Dispatch) => {
        dispatch(createViewElectionResultsAction(electionId));
        refreshBallots() (dispatch);    
  };
};

export interface ViewElectionResultsAction extends Action<typeof VIEW_ELECTION_RESULTS_ACTION> {
  payload: {
    electionId: number;
  };
}

export function isViewElectionResultsAction(action: AnyAction): action is ViewElectionResultsAction {
  return action.type === VIEW_ELECTION_RESULTS_ACTION;
}

export type CreateViewElectionResultsAction = (electionId: number) => ViewElectionResultsAction;

export const createViewElectionResultsAction: CreateViewElectionResultsAction = (electionId) => {
  return {
    type: VIEW_ELECTION_RESULTS_ACTION,
    payload: {
      electionId,
    },
  };
};

export type ElectionActions = AddElectionAction | RefreshElectionDoneAction | ViewElectionResultsAction;