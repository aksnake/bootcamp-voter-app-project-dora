import React from 'react';
import {Election } from "../models/election";

export type ElectionTableProps = {
    elections: Election[],
}

export function ElectionTable(props: ElectionTableProps) {    
        
    const electionTableRows = props.elections.map((c) => (            
            <tr key={c.id}>
                <td>{c.id}</td>
                <td><ul>{c.questions.map((q) => (<li key={q.id}>{q.question}</li>))}</ul></td>
                <td>
                <button type="button" >View Results</button> 
                </td>
            </tr>
    )); 
    
    return  (
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
                
    );
}
