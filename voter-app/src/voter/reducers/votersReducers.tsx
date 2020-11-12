import { Reducer, combineReducers } from "redux";

import { VotersSort } from "../models/voterStore";
import { Voter } from "../models/voters";
import {
  VoterActions,
  isEditVoterAction,
  isCancelVoterAction,
  isSortVotersAction,
  isRefreshVotersDoneAction,
} from "../actions/voterActions";

export const votersListReducer: Reducer<Voter[], VoterActions> = (voters = [], action) => {
  if (isRefreshVotersDoneAction(action)) {
    return action.payload.voters;
  }

  return voters;
};

export const editVoterIdReducer: Reducer<number, VoterActions> = (
  editVoterId = -1,
  action
) => {
  if (isEditVoterAction(action)) {
    return action.payload.voterId;
  }

  if (isCancelVoterAction(action) || isRefreshVotersDoneAction(action)) {
    return -1;
  }

  return editVoterId;
};

export const votersSortReducer: Reducer<VotersSort, VoterActions> = (
  votersSort = { sortCol: "id", sortDir: "asc" },
  action
) => {
  if (isSortVotersAction(action)) {
    if (
      votersSort.sortCol === action.payload.sortCol &&
      votersSort.sortDir === "asc"
    ) {
      return {
        sortCol: action.payload.sortCol,
        sortDir: "desc",
      };
    } else {
      return {
        sortCol: action.payload.sortCol,
        sortDir: "asc",
      };
    }
  }

  return votersSort;
};

export const votersReducer = combineReducers({
  voters: votersListReducer,
  editVoterId: editVoterIdReducer,
  votersSort: votersSortReducer,
});
