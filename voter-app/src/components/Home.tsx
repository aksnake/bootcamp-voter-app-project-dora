import React from "react";
import { useSelector } from "react-redux";
import { BallotContainer } from "../ballots/containers/ballotContainer";
import { ElectionSelectorFormContainer } from "../ballots/containers/electionSelectorContainer";
import { UserIdentificationFormContainer } from "../ballots/containers/userIdentificationContainer";
import { VoterAppState } from "../models/voterApp";
import "./VoterApp.css";

export type HomeProps = {
  selectedElectionId: number,
  voterId: number,
};

export const Home = (props: HomeProps) => {
  const stateProps = useSelector((state: VoterAppState) => {
    return {
      electionId: state.selectedElectionId,
        };
    });
  return <div>
      <div>Home</div>
      <BallotContainer/>
      {/* {
        (props.selectedElectionId !== -1 && props.voterId !== -1) ?
      <ElectionSelectorFormContainer/>
      : (props.selectedElectionId !== -1) ?
      <UserIdentificationFormContainer {...stateProps}/>
      :
      <BallotContainer/>
      } */}
    </div>;
};
