import { Action, AnyAction, Dispatch } from "redux";
import { Ballot, NewBallot } from "../models/ballot";
import { UserValidationState } from "../models/ballotStore";

//Actions
//Create Ballot Action for voting (VoterId, Election Id)
//Update Vote Action for commencing the vote (Cast Vote action)
//Read votes to check a voter already voted or not (User should not vote with 2 windows open at same time or with 2 browsers)
//Read all votes

//Create Ballot Action for voting (VoterId, Election Id)
export const NEW_BALLOT_ACTION = "NEW_BALLOT";
//Update Vote Action for commencing the vote (Cast Vote action)
export const UPDATE_BALLOT_ACTION = "UPDATE_BALLOT";
//Read votes to check a voter already voted or not (VoterId, Election Id) 
//(User should not vote with 2 windows open at same time or with 2 browsers)
export const READ_BALLOTS_ACTION = "READ_BALLOTS";
//Read all votes (Election Id)
export const READ_ALL_BALLOTS_ACTION = "READ_ALL_BALLOTS";

//Probably REFRESH_BALLOT_REQUEST_ACTION is not required, as we cannot create a Ballot without Election? 
export const REFRESH_BALLOT_REQUEST_ACTION = "REFRESH_BALLOT_REQUEST_ACTION";
export const REFRESH_BALLOT_DONE_ACTION = "REFRESH_BALLOT_DONE_ACTION";
export const BALLOT_DONE_ACTION = "BALLOT_DONE_ACTION";
export const GO_HOME_ACTION = "GO_HOME_ACTION";

export const CREATE_BALLOT_REQUEST_ACTION = "CREATE_BALLOT_REQUEST_ACTION";

export const VALIDATE_USER_REQUEST_ACTION = "VALIDATE_USER_REQUEST_ACTION";

export type RefreshBallotRequestAction = Action<
  typeof REFRESH_BALLOT_REQUEST_ACTION
>;

export function isRefreshBallotRequestAction(
  action: AnyAction
): action is RefreshBallotRequestAction {
  return action.type === REFRESH_BALLOT_REQUEST_ACTION;
}

export type CreateRefreshBallotRequestAction = () => RefreshBallotRequestAction;

export const createRefreshBallotRequestAction: CreateRefreshBallotRequestAction = () => {
  return {
    type: REFRESH_BALLOT_REQUEST_ACTION,
  };
};

export interface RefreshBallotDoneAction
  extends Action<typeof REFRESH_BALLOT_DONE_ACTION> {
  payload: {
    ballots: Ballot[];
  };
}

export function isRefreshBallotDoneAction(
  action: AnyAction
): action is RefreshBallotDoneAction {
  return action.type === REFRESH_BALLOT_DONE_ACTION;
}

export type CreateRefreshBallotDoneAction = (
  ballots: Ballot[]
) => RefreshBallotDoneAction;

export const createRefreshBallotDoneAction: CreateRefreshBallotDoneAction = (
  ballots
) => {
  return {
    type: REFRESH_BALLOT_DONE_ACTION,
    payload: {
      ballots,
    },
  };
};

export interface GoHomeAction
  extends Action<typeof GO_HOME_ACTION> {
}

export function isGoHomeAction(
  action: AnyAction
): action is GoHomeAction {
  return action.type === GO_HOME_ACTION;
}

export type CreateGoHomeAction = (
) => GoHomeAction;

export const createGoHomeAction: CreateGoHomeAction = (
) => {
  return {
    type: GO_HOME_ACTION,
  };
};

//New Ballot Action needs Election Id to create right ballot for the election, after creating a new ballot
//We need to return it to user.
export const refreshBallots = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshBallotRequestAction());
    return fetch("http://localhost:3060/ballots")
      .then((res) => res.json())
      .then((ballots) => dispatch(createRefreshBallotDoneAction(ballots)));
  };
};

export interface VoteCastedAction
  extends Action<typeof BALLOT_DONE_ACTION> {
  payload: {
    message: string;
  };
}
export function isVoteCastedAction(
    action: AnyAction
  ): action is VoteCastedAction {
    return action.type === BALLOT_DONE_ACTION;
  }
  
  export type CreateVoteCastedAction = (
    message: string
  ) => VoteCastedAction;
  
  export const createVoteCastedAction: CreateVoteCastedAction = (
    message
  ) => {
    return {
      type: BALLOT_DONE_ACTION,
      payload: {
        message,
      },
    };
  };
  
  //New Ballot Action needs Election Id to create right ballot for the election, after creating a new ballot
  //We need to return it to user.
//   export const castedVote = () => {
//     return (dispatch: Dispatch) => {
//       dispatch(createRefreshBallotRequestAction());
//       return fetch("http://localhost:3060/ballots")
//         .then((res) => res.json())
//         .then((ballots) => dispatch(createVoteCastedAction(ballots)));
//     };
//   };



export interface CreateBallotRequestAction extends Action<typeof CREATE_BALLOT_REQUEST_ACTION> {
  payload: {
    electionId: number;
  };
}

export function isCreateBallotRequestAction(action: AnyAction): action is CreateBallotRequestAction {
  return action.type === CREATE_BALLOT_REQUEST_ACTION;
}

export type CreateCreateBallotRequestAction = (electionId: number) => CreateBallotRequestAction;

export const createCreateBallotRequestAction: CreateCreateBallotRequestAction = (electionId) => {
  return {
    type: CREATE_BALLOT_REQUEST_ACTION,
    payload: {
        electionId,
    },
  };
};

export const createBallot = (electionId: number) => {
    console.log("CreateBallot request for" + electionId);
  return (dispatch: Dispatch) => {
    dispatch(createCreateBallotRequestAction(electionId));
    //TODO: Not the time to create ballot -Do user verification first. using get call temporarily.
    return fetch("http://localhost:3060/ballots")
    // return fetch("http://localhost:3060/ballots", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(electionId),
    // })
    .then((res) => res.json()).then((ballot) => {
      //console.log("Created Ballot " + ballot.id);
      //refreshCreateBallots() (dispatch);//Vote done successfully
    });
  };
};


export interface ValidateUserRequestAction extends Action<typeof VALIDATE_USER_REQUEST_ACTION> {
    payload: {
        userValidation: UserValidationState,
    };
  }
  
  export function isValidateUserRequestAction(action: AnyAction): action is ValidateUserRequestAction {
    return action.type === VALIDATE_USER_REQUEST_ACTION;
  }
  
  export type CreateValidateUserRequestAction = (userValidation: UserValidationState) => ValidateUserRequestAction;
  
  export const createValidateUserRequestAction: CreateValidateUserRequestAction = (userValidation) => {
    return {
      type: VALIDATE_USER_REQUEST_ACTION,
      payload: {
        userValidation
      },
    };
  };

//Some of the work may go to Container and it may make multiple requests to Action instead of below method.
export const createBallotForUser = (electionId: number, voterId: number, phoneNumber: string) => {
    console.log("CreateBallot request for" + electionId);
  return (dispatch: Dispatch) => {
    dispatch(createCreateBallotRequestAction(electionId));
    //TODO: Not the time to create ballot -Do user verification first. using get call temporarily.
    //First validation that user identification is correct and user didn't vote already in this election.
    //then get ballot
    return fetch("http://localhost:3060/elections")
    // return fetch("http://localhost:3060/ballots", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(electionId),
    // })
    .then((res) => res.json()).then((election) => {
        //Create new ballot
      console.log("Create Ballot for election: " + election.id + ", voter: " + voterId);
      //TODO: No need to save this ballot with draft state, just pass the newBallot to UI without any backend call, get rid of status.
      //When it becomes an a call from container we don't need to store questions in ballot too.
      const newBallot: NewBallot = {voterId: voterId, electionId: electionId, answers: [], questions: election.questions};
      //createNewBallot(newBallot);
      //Pass it to a Resolver for new Route with newBallot
      //refreshCreateBallots() (dispatch);//Vote done successfully
    });
  };
};


export interface NewBallotAction extends Action<typeof NEW_BALLOT_ACTION> {
    payload: {
      newBallot: NewBallot;
    };
  }
  
  export function isNewBallotAction(action: AnyAction): action is NewBallotAction {
    return action.type === NEW_BALLOT_ACTION;
  }
  
  export type CreateNewBallotAction = (newBallot: NewBallot) => NewBallotAction;
  
  export const createNewBallotAction: CreateNewBallotAction = (newBallot) => {
    return {
      type: NEW_BALLOT_ACTION,
      payload: {
          newBallot,
      },
    };
  };
  
  export const createNewBallot = (newBallot: NewBallot) => {
    return (dispatch: Dispatch) => {
      dispatch(createNewBallotAction(newBallot));
      return fetch("http://localhost:3060/ballots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBallot),
      })
      .then((res) => res.json())
      .then((ballot) => {
        console.log("BalNewBallot Added ="+ ballot.id);
        dispatch(createVoteCastedAction("Success!"));
      })
    //   .then(() => dispatch(createVoteCastedAction("Success!")));
    };
  };

export interface UpdateBallotAction extends Action<typeof UPDATE_BALLOT_ACTION> {
    payload: {
      ballot: Ballot;
    };
  }
  
  export function isUpdateBallotAction(action: AnyAction): action is UpdateBallotAction {
    return action.type === UPDATE_BALLOT_ACTION;
  }
  
  export type CreateUpdateBallotAction = (ballot: Ballot) => UpdateBallotAction;
  
  export const createUpdateBallotAction: CreateUpdateBallotAction = (ballot) => {
    return {
      type: UPDATE_BALLOT_ACTION,
      payload: {
        ballot,
      },
    };
  };
  
  export const updateBallot = (ballot: Ballot) => {
    console.log("UpdateBallot " + ballot.answers);
    return (dispatch: Dispatch) => {
      dispatch(createUpdateBallotAction(ballot));
      return fetch("http://localhost:3060/ballots/"+ ballot.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ballot),
      }).then((res) => res.json()).then((ballot) => {
        console.log("Ballot Updated =" + ballot.id);
      //   refreshUpdateBallots() (dispatch);//Vote done successfully
      });
    };
  };

export interface ViewAllBallotsAction extends Action<typeof READ_ALL_BALLOTS_ACTION> {
  payload: {
    electionId: number;
  };
}

export function isViewAllBallotsAction(action: AnyAction): action is ViewAllBallotsAction {
  return action.type === READ_ALL_BALLOTS_ACTION;
}

export type CreateViewAllBallotsAction = (electionId: number) => ViewAllBallotsAction;

export const createViewAllBallotsAction: CreateViewAllBallotsAction = (electionId) => {
  return {
    type: READ_ALL_BALLOTS_ACTION,
    payload: {
      electionId,
    },
  };
};

//Is this just a method, not an action?
//User cannot edit a ballot if it is completed. Else we return same ballot to user.
export interface ViewBallotsAction extends Action<typeof READ_ALL_BALLOTS_ACTION> {
    payload: {
      voterId: number,
      electionId: number;
    };
  }
  
  export function isViewBallotsAction(action: AnyAction): action is ViewBallotsAction {
    return action.type === READ_ALL_BALLOTS_ACTION;
  }
  
  export type CreateViewBallotsAction = (voterId: number, electionId: number) => ViewBallotsAction;
  
  export const createViewBallotsAction: CreateViewBallotsAction = (voterId, electionId) => {
    return {
      type: READ_ALL_BALLOTS_ACTION,
      payload: {
        voterId,
        electionId,
      },
    };
  };

  
export type BallotActions = CreateBallotRequestAction | NewBallotAction | RefreshBallotDoneAction | ViewBallotsAction | ViewAllBallotsAction | VoteCastedAction | ValidateUserRequestAction | GoHomeAction; 