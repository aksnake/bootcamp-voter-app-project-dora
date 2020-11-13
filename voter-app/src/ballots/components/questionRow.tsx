import React, { useState } from "react";
import { QuestionWithPossibleAnswers } from "../../elections/models/election";
import { Answer } from "../models/ballot";

export type QuestionRowProps = {
  question: QuestionWithPossibleAnswers;
  answer: Answer;
  onValueChange: (answer: Answer) => void;
};

export const QuestionRow = (props: QuestionRowProps) => {
  const [answer, setAnswer] = useState(props.answer);

    const setAnswerValue = (value: string) =>  {
      const newAnswer = {...answer};
      newAnswer.answer = value;
        setAnswer({
            ...answer,
            answer: value,
          });
        props.onValueChange(newAnswer);
    };

    let optionItems = props.question.possibleAnswers.map((possibleAnswer) =>
    <option key={possibleAnswer}>{possibleAnswer}</option>
    );

  return (
    <tr>
      <td>{props.question.id}</td>
      <td>
        {props.question.question}
      </td>
      <td>
          <div>
            <select
                className="textboxstyle"
                onChange={(e) => setAnswerValue(e.target.value)} 
                >
                {optionItems}
              </select>
          </div>
      </td>
    </tr>
  );
};
                