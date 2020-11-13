import React from "react";
import { useSelector } from "react-redux";
import { BallotContainer } from "../ballots/containers/ballotContainer";
import { ElectionSelectorFormContainer } from "../ballots/containers/electionSelectorContainer";
import { UserIdentificationFormContainer } from "../ballots/containers/userIdentificationContainer";
import { UserValidationState } from "../ballots/models/ballotStore";
import { Election } from "../elections/models/election";
import { VoterAppState } from "../models/voterApp";
import { Voter } from "../voter/models/voters";
import { VoterState } from "../voter/models/voterStore";
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
      electionId: state.selectedElectionId,
        };
    });
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
