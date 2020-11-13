import React from 'react';
import {Election, ElectionResult } from "../models/election";


export type ElectionTableProps = {
    elections: Election[],
    electionResults: ElectionResult[],
    viewResultsElectionId: number
    onViewResults: (electionId: number) => void,    
}

export function ElectionTable(props: ElectionTableProps) {   
    
    const electionResultsCellData = props.electionResults.length ? 
        ( 
            <ol>
            {props.electionResults.map((result) => (
                <li key={result.questionId}>{result.answerTotals.map((answer) => {return (<label key={answer.result}> {answer.result} : {answer.count} </label>)})}</li>
            ))}
            </ol>    
        ) : <label>No Results Found</label>;
                   
    const electionTableRows = props.elections.map((c) => (
            c.id === props.viewResultsElectionId ?
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
                <button type="button" onClick={() => props.onViewResults(c.id)}>View Results</button> 
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