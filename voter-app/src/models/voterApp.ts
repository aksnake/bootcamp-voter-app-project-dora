import { Ballot } from "../ballots/models/ballot";
import {Election} from "../elections/models/election";
import {VoterState} from "../voter/models/voterStore"

export type VoterAppState = {
  elections: Election[];
  ballots: Ballot[];
  voters: VoterState;
  selectedElectionId: number;
};