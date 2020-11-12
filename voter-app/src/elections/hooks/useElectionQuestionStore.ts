import {Question, NewQuestion} from "../models/election";
import {useList} from "../../hooks/useList";

export type ElectionQuestionStore = [ 
                            questions: Question[], 
                            addQuestion: (questionToAdd: NewQuestion) => void,
                            deleteQuestion: (questionIdToDelete: number) => void,
                            resetQuestionList: () => void,
                         ]

export type UseElectionQuestionStore = (initialElectionQuestions: Question[]) => ElectionQuestionStore;

export const useElectionQuestionStore: UseElectionQuestionStore = (initialElectionQuestions) => {
    const [questions, addQuestionHook, , deleteQuestionHook, resetQuestionList] = useList([...initialElectionQuestions]);

    return [ questions, addQuestionHook, deleteQuestionHook, resetQuestionList];
};
