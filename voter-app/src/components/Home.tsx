import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BallotContainer } from "../ballots/containers/ballotContainer";
import { ElectionSelectorFormContainer } from "../ballots/containers/electionSelectorContainer";
import { UserIdentificationFormContainer } from "../ballots/containers/userIdentificationContainer";
import { UserValidationState } from "../ballots/models/ballotStore";
import { refreshElections } from "../elections/actions/electionToolActions";
import { Election } from "../elections/models/election";
import { VoterAppState } from "../models/voterApp";
import { refreshVoters } from "../voters/actions/voterActions";
import { Voter } from "../voters/models/voters";
import { VoterState } from "../voters/models/voterStore";
import "./VoterApp.css";

export type HomeProps = {
  elections: Election[],
  voters: VoterState,
  selectedElectionId: number,
  selectedVoter: UserValidationState,

};

export const Home = (props: HomeProps) => {
  const stateProps = useSelector((state: VoterAppState) => {
    return {
      electionId: props.selectedElectionId,
      voters: props.voters.voters,
        };
    });
    const dispatch = useDispatch();
    useEffect(() => {
      refreshElections()(dispatch);
      refreshVoters()(dispatch);
    }, [dispatch]);
  return <div>
      <br></br>
      <div></div>
      {
        (props.selectedElectionId === -1 && (props.selectedVoter === undefined || props.selectedVoter.voterId === -1)) ?
      <ElectionSelectorFormContainer/>
      : (props.selectedElectionId !== -1 && (props.selectedVoter === undefined || props.selectedVoter.voterId === -1)) ?
      <UserIdentificationFormContainer {...stateProps}/>
      :
      <BallotContainer/>
      }
    </div>;
};
