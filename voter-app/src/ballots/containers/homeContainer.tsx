import React, {useMemo} from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
    createNewBallot,
} from "../actions/ballotActions";
import { BallotState } from "../models/ballotStore";
import { Ballot } from "../components/ballots";
import { Election, ElectionWithQnAnswers, Question, QuestionWithPossibleAnswers } from "../../elections/models/election";
import { Answer } from "../models/ballot";
import { Home } from "../../components/Home";
import { VoterAppState } from "../../models/voterApp";

export function HomeContainer() {
  const stateProps = useSelector((state: VoterAppState) => {
    return {
      elections: state.elections,
      voters: state.voters,
      selectedElectionId:state.selectedElectionId,
      selectedVoter: state.selectedVoter,
    };
  });
//   const dispatch = useDispatch();

//   const boundActionProps = useMemo(
//     () => bindActionCreators(
//     {
//         onCastVote: createNewBallot,
//     },
//     dispatch
//     ),
//   [dispatch]
//   );

  return <Home {...stateProps} />;
}
// {...boundActionProps}