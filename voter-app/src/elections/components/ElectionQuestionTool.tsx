import React, {useMemo} from 'react';
import {ElectionQuestionList} from "./ElectionQuestionList";
import {NewQuestion, NewElection} from "../models/election";
import {ElectionQuestionForm} from "./ElectionQuestionForm";
import { useElectionQuestionStoreContext } from "../context/electionQuestionStoreContext";
import { addElection } from "../actions/electionToolActions";
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';

//function declaration (js)
//component (react)
export function ElectionQuestionTool() {   

    const [questions, addQuestionHook, deleteQuestionHook, resetQuestionListHook] = useElectionQuestionStoreContext();
    
    const dispatch = useDispatch();

    const boundActionProps = useMemo(
      () =>
        bindActionCreators(
          {
            onAddElection: addElection,
          },
          dispatch
        ),
      [dispatch]
    );
    
    const addQuestion = (newQuestion: NewQuestion) => {
        addQuestionHook(newQuestion);
    };

    const deleteQuestion = (questionIdToDelete: number) => {
        deleteQuestionHook(questionIdToDelete);
    };
    
    const addElectionHook = (newElection: NewElection) => {
        boundActionProps.onAddElection(newElection);
        resetQuestionListHook();
    }
    
    console.log(questions);

    return  (
            <div className="election-question-tool">
                Question List:
                <ElectionQuestionList questions={questions} onDeleteQuestion={deleteQuestion} />  
                <ElectionQuestionForm addButtonText="Add Question" onSubmitQuestion={addQuestion}/>
                <br/>
                <button type="button" onClick={() => addElectionHook({questions})}>Create Election</button>
            </div>
    );
}
