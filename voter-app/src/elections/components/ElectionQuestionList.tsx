import React from 'react';
import {Question} from "../models/election";

export type ElectionQuestionListProps = {
    questions: Question[],
    onDeleteQuestion: (id: number) => void;
}

export function ElectionQuestionList(props: ElectionQuestionListProps) { 

    const deleteQuestion = (id: number) => {
        props.onDeleteQuestion(id);
    };

    const questionsListItems = props.questions.map((c) => (
            <li key={c.id}>
                {c.question} 
                <button type="button" onClick={() => deleteQuestion(c.id)}>Delete</button>
            </li>
    ));

    return <ul> {questionsListItems} </ul>
}
