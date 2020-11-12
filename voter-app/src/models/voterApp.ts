import { Ballot } from "../ballots/models/ballot";
import {Election} from "../elections/models/election";
import {Voter} from "../voter/models/voters"

export type VoterAppState = {
  elections: Election[];
  ballots: Ballot[];
  voters: Voter[];
  editVoterId: number;
  votersSort: VotersSort;
};

export type SortDir = 'asc' | 'desc';

export type VotersSort = {
  sortCol: keyof Voter;
  sortDir: SortDir;
};