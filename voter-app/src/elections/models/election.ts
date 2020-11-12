import {Item} from "../../models/item";

export type NewElection = {
    questions: Question[];
}

export type NewQuestion = {
    question: string;
}
export type Question = NewQuestion & Item;
export type Election = NewElection & Item;


