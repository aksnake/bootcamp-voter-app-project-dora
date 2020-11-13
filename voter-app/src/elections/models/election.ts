import {Item} from "../../models/item";

export type NewElection = {
    questions: Question[];
}

export type NewQuestion = {
    question: string;
}

export type Question = NewQuestion & Item;
export type Election = NewElection & Item;

//Used in Ballot Module now
export type NewQuestionWithPossibleAnswers = {
    question: string;
    possibleAnswers: string[];
}
export type NewElectionWithQnAnswers = {
    questions: QuestionWithPossibleAnswers[];
}
export type QuestionWithPossibleAnswers = NewQuestionWithPossibleAnswers & Item;
export type ElectionWithQnAnswers = NewElectionWithQnAnswers & Item;


