import React from 'react';
import {ElectionTable} from "../components/ElectionTable";
import {Election, ElectionResult, AnswerTotal} from "../models/election";
import {Ballot} from "../../ballots/models/ballot"
import {useElectionStoreContext} from "../context/electionStoreContext"

export type ResultTabulation = (ballots: Ballot[]) => ElectionResult[];

export type ElectionTableContainerProps = {
    elections: Election[],
    ballots: Ballot[],
    onViewResults: (electionId: number) => void,
};

export function ElectionTableContainer(props: ElectionTableContainerProps) {
    
    const [viewResultsElectionId, viewResultsHook] = useElectionStoreContext();
    
        const viewResults = (electionId: number) => {
        props.onViewResults(electionId);
        viewResultsHook(electionId);
    };
    
    //from the list of ballots, collect all which are tied to the election whose results we are viewing, if any  
    const targetBallots = props.ballots.filter(ballot => ballot.electionId===viewResultsElectionId);
    //tabulate the results from those ballots
    const electionResults = targetBallots.length ?  tabulateResults(targetBallots) : [];
    
    return  <ElectionTable elections={props.elections} electionResults={electionResults} viewResultsElectionId={viewResultsElectionId} onViewResults={viewResults} />;
            
};

const tabulateResults : ResultTabulation = (ballots) => {
   
    //results map is a list of tabulated results by question (questionId = key)
    const resultsMap = new Map<number, Map<string, number>>();
    
    //for each ballot, update the answer counts for each question
    ballots.map((ballot)=> addBallotToResults(ballot, resultsMap)); 
    
    //convert the map to an ElectionResult object
    const finalResults: ElectionResult[]  = [];   
    resultsMap.forEach((val, key) => {
                            const answerTotals: AnswerTotal[]  = [];
                            val.forEach((val, key) => {answerTotals.push({result: key, count: val})});   
                            finalResults.push({questionId: key, answerTotals: answerTotals})
                        });
         
    return finalResults;
}


function addBallotToResults(ballot: Ballot, resultsMap: Map<number, Map<string, number>>) {    
    ballot.answers.map((entry) => 
        {
            //get the existing list of answers for the given associated question (tied to answer id)
            //if first time, create a new map
            const currentAnswersMap = resultsMap.get(entry.id);
            const answersMapToSet = currentAnswersMap ? currentAnswersMap : new Map<string, number>();
            
            //now get the existing count, if any.  Increment by 1 if found or set to 1 if not
            const currentValue = answersMapToSet.get(entry.answer.toString());
            const valueToSet = currentValue ? currentValue + 1 : 1;
            
            //add the update results back to the map
            answersMapToSet.set(entry.answer.toString(), valueToSet);
            resultsMap.set(entry.id, answersMapToSet);
            return true;
        });
}
