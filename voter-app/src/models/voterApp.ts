import { Ballot } from "../ballots/models/ballot";
import {Election} from "../elections/models/election";

export type VoterAppState = {
  elections: Election[];
  ballots: Ballot[];
};
