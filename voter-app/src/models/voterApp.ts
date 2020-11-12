import {Election} from "../elections/models/election";
import {Voter} from "../voter/models/voters"

export type VoterAppState = {
  elections: Election[];
};

export type VoterState = {
  voters: Voter[];
  editVoterId: number;
  votersSort: VotersSort;
};

export type SortDir = 'asc' | 'desc';

export type VotersSort = {
  sortCol: keyof Voter;
  sortDir: SortDir;
};