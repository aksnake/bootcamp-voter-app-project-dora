import React from 'react';
import {NewQuestion} from "../models/election";
import {useForm} from "../../hooks/useForm";

export type ElectionQuestionFormProps = {
    addButtonText: string,
    onSubmitQuestion: (question: NewQuestion) => void;
};

export function ElectionQuestionForm(props: ElectionQuestionFormProps) {
    const [ electionQuestionForm, change, resetElectionForm ] = useForm({
        question: ""
    }); 

    const submitQuestion = () => {
        props.onSubmitQuestion({
        ...electionQuestionForm,
        });

        resetElectionForm();
    };

    console.log(electionQuestionForm);

    return (
    <form>
        <div>
            <label htmlFor="question-input">Question</label>
            <input type="text" id="question-input" value={electionQuestionForm.question} name="question" onChange={change} />
        </div>
        <button type="button" onClick={submitQuestion}>
            {props.addButtonText}
        </button>
    </form>
    )
}
