import { Election } from "../../elections/models/election";
import { Answer } from "./ballot";

export type BallotState = {
  election: Election;
  voterId: number;
  answers: Answer[];
  message: string,
};

export type UserValidationState = {
  voterId: number,
  phoneNumber: string,
}