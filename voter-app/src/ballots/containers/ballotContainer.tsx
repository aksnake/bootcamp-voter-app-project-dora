import React, {useMemo} from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
    createNewBallot,
} from "../actions/ballotActions";
import { BallotState } from "../models/ballotStore";
import { Ballot } from "../components/ballots";
import { Election, ElectionWithQnAnswers, Question, QuestionWithPossibleAnswers } from "../../elections/models/election";
import { Answer } from "../models/ballot";

export function BallotContainer() {
  const stateProps = useSelector((state: BallotState) => {
    const getQuestionsWithPossibleAnswers = (questions: Question[]) => {
        const questionsWithPossibleAnswers: QuestionWithPossibleAnswers[] = [];
        const possibleAnswers: string[] = ['No', 'Yes'];
        questions.forEach(question => {
            const questionWithPossibleAnswers: QuestionWithPossibleAnswers = {id: question.id, question:question.question, possibleAnswers: possibleAnswers}
            questionsWithPossibleAnswers.push(questionWithPossibleAnswers);
        });
        return questionsWithPossibleAnswers;
    }
    const getElectionWithQnPossibleAnswers = (election: Election) => {
        const electionWithQnAnswers: ElectionWithQnAnswers = { id: election.id, questions: getQuestionsWithPossibleAnswers([...election.questions])};
        return electionWithQnAnswers;
    }
    const getAnswersInitialArray = (election: ElectionWithQnAnswers) => {
        const answers : Answer[] = [];
        election.questions.forEach(question => {
            let answer: Answer = {id: question.id, answer: ''}
            answers.push(answer);
        });
        return answers;
    }

    //TODO: Making a dummy election to test this component
    const questions1: Question[] = []
    const question1: Question = {id: 1, question:"1 + 1 === 2?"}
    const question2: Question = {id: 2, question:"1 * 0 === 0?"}
    questions1.push(question1);
    questions1.push(question2);
    const questions2: Question[] = [];
    questions2.push(question1);
    const election1: Election = {id: 1, questions: questions1};
    const election2: Election = {id: 2, questions: questions2};
    const elections: Election[] = [];
    elections.push(election1); 
    elections.push(election2); 

    const election = {id: 1, questions: questions1};//{...state.election};
    const electionWithQnAnswers = getElectionWithQnPossibleAnswers(election);
    return {
      election: electionWithQnAnswers,
      voterId: 1,//state.voterId,
      answers: getAnswersInitialArray(electionWithQnAnswers),
      message: state.message,
    };
  });
  const dispatch = useDispatch();

  const boundActionProps = useMemo(
    () => bindActionCreators(
    {
        onCastVote: createNewBallot,
    },
    dispatch
    ),
  [dispatch]
  );

  return <Ballot {...stateProps} {...boundActionProps} />;
}
