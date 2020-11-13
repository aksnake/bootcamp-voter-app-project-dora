import React from 'react';
import {Election } from "../models/election";
import {useElectionStoreContext} from "../context/electionStoreContext"
import {Ballot} from "../../ballots/models/ballot"

type ElectionResult = {
    questionId: number,
    answerTotals: AnswerTotal[];
}

type AnswerTotal = {
    result: string,
    count: number,
}

type ResultTabulation = (ballots: Ballot[]) => ElectionResult[];

export type ElectionTableProps = {
    elections: Election[],
    ballots: Ballot[],
}

export function ElectionTable(props: ElectionTableProps) {
    
    const [viewResultsElectionId, viewResultsHook] = useElectionStoreContext();
    const viewResults = (electionId: number) => {
        viewResultsHook(electionId);
    };
    
    //from the list of ballots, collect all which are tied to the election whose results we are viewing, if any  
    const targetBallots = props.ballots.filter(ballot => ballot.electionId===viewResultsElectionId);
    //tabulate the results from those ballots
    const electionResults = targetBallots.length ?  tabulateResults(targetBallots) : [];
    //render the cell data
    const electionResultsCellData = electionResults.length ? 
        ( 
            <ol>
            {electionResults.map((result) => (
                <li key={result.questionId}>{result.answerTotals.map((answer) => {return (<label key={answer.result}> {answer.result} : {answer.count} </label>)})}</li>
            ))}
            </ol>    
        ) : <label>No Results Found</label>;
                   
    const electionTableRows = props.elections.map((c) => (
            c.id === viewResultsElectionId ?
            <tr key={c.id}>
                <td>{c.id}</td>
                <td><ol>{c.questions.map((q) => (<li key={q.id}>{q.question}</li>))}</ol></td>
                <td>
                {electionResultsCellData}
                </td>
            </tr> :
            
            <tr key={c.id}>
                <td>{c.id}</td>
                <td><ol>{c.questions.map((q) => (<li key={q.id}>{q.question}</li>))}</ol></td>
                <td>
                <button type="button" onClick={() => viewResults(c.id)}>View Results</button> 
                </td>
            </tr>
    )); 
    
    const table = props.elections.length ? (
                <table>     
                    <thead>
                    <tr>
                        <th className="col-header">Id</th>
                        <th className="col-header">Questions</th>
                        <th>Results</th>
                    </tr>
                    </thead>   
                    <tbody>{electionTableRows}</tbody>
                </table>
                
            ) : (<div/>);
    
    return table;
}

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