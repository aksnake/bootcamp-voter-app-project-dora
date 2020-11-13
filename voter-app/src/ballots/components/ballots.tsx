import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import "../../components/VoterApp.css";
import { Election, ElectionWithQnAnswers, Question, QuestionWithPossibleAnswers } from "../../elections/models/election";
import { Answer, NewBallot } from "../models/ballot";
import { BallotQuestionTable } from "./questionTable";

export type BallotProps = {
    election: ElectionWithQnAnswers,
    voterId: number,
    answers: Answer[],
    message: string,
    onCastVote: (newBallot: NewBallot) => void;
    goHome:()=>void;
};

export const Ballot = (props: BallotProps) => {
  const history = useHistory();

    const [ballotForm, setBallotForm] = useState({
        election: props.election,
        voterId: props.voterId,
        answers: props.answers,
        message: props.message,
    });
    const onValueChange = (answers: Answer[]) =>  {
    setBallotForm({
            ...ballotForm,
            answers: answers,
          });
    };
    const castVote = () => {
        //TODO: Remove Questions
        const answers = [...ballotForm.answers];
        answers.forEach(answer => {
            if (answer.answer === '') answer.answer="No";
        });
        const newBallot: NewBallot = {electionId: props.election.id, voterId: props.voterId, answers: answers};
        props.onCastVote(newBallot);
      };

  return (
    <div className="form">
      <button type="button" className='back-button' onClick={props.goHome}>
        Go Home
      </button>
      {/* <div>Select an Election to vote</div> */}
      {
        (props.message === '')? 
            <form>
                <BallotQuestionTable questions={ballotForm.election.questions} answers={ballotForm.answers} onValueChange={onValueChange} />
                <button type="button" onClick={castVote}>
                    Cast Vote
                </button>
            </form>
        :
        <label>{props.message}</label>
      }
    </div>
  );
};