import { Question } from "../../elections/models/election";
import {Item} from "../../models/item";

export type NewBallot = {
    voterId: number;
    electionId: number;
    answers: Answer[];
    questions: Question[];
}

export type NewAnswer = {
    answer: string;
}
export type Answer = NewAnswer & Item;
export type Ballot = NewBallot & Item;
