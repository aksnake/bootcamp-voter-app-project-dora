import React from 'react' 
import { Election } from '../../elections/models/election';
import { useForm } from '../../hooks/useForm';

export type ElectionSelectorFormProps = {
    elections: Election[],
    selectedElectionId: number,
    onVoteRequest: (electionId: number) => void;
};

export function ElectionSelectorForm(props: ElectionSelectorFormProps) {
    const [elections, change, resetElectionSelectorForm ] = useForm (props.elections);
    let selectedElectionId = -1;
    const setElectionId = (id: number) =>  {
        selectedElectionId = id;
    }
    const submitVote = () =>  {
        if (selectedElectionId != -1) {
        props.onVoteRequest(selectedElectionId);
        resetElectionSelectorForm();
        }
    }
    let optionItems = props.elections.map((election) =>
    <option key={election.id}>{election.id}</option>
    );
    return (
        <form>
            <div>
            <select
                className="textboxstyle"
                onChange={(e) => setElectionId(Number(e.target.value))} 
                >
                <option key='-1'>Select Election</option>
                {optionItems}
                </select>
            </div>
            <button type="button" onClick={submitVote}>
                Vote
            </button>
        </form>
    )
}