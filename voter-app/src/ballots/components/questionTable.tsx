import React, { useState } from "react";
import { QuestionWithPossibleAnswers } from "../../elections/models/election";
import { Answer } from "../models/ballot";
import { QuestionRow } from "./questionRow";

export type BallotQuestionTableProps = {
  questions: QuestionWithPossibleAnswers[];
  answers: Answer[];
  onValueChange: (answers: Answer[]) => void;
};

export function BallotQuestionTable(props: BallotQuestionTableProps) {
  const [answers, setAnswers] = useState(props.answers);
  const onValueChange = (answer: Answer) => {
        const answersNew: Answer[] = [...answers];
        answersNew.forEach(ans => {
            if (ans.id === answer.id) {
                ans.answer = answer.answer;
            }
         });
    setAnswers(answersNew);
    props.onValueChange(answersNew);
  }
  return (
    <table id="ballot-question-table">
      <thead>
        <tr>
          <th className="col-header">No.</th>
          <th className="col-header">Question</th>
          <th className="col-header">Your Answer</th>
        </tr>
      </thead>
      <tbody>
        {[...props.questions].map((question) => 
                <QuestionRow
                key={question.id}
                question={question}
                answer={answers.filter(answer => answer.id === question.id)[0]}
                onValueChange= {onValueChange}
                />
        )}
      </tbody>
    </table>
  );
}