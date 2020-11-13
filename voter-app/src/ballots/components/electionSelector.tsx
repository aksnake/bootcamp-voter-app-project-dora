import React from 'react' 
import { Election } from '../../elections/models/election';
import { useForm } from '../../hooks/useForm';
import "../../components/VoterApp.css";

export type ElectionSelectorFormProps = {
    elections: Election[],
    selectedElectionId: number,
    onVoteRequest: (electionId: number) => void;
};

export function ElectionSelectorForm(props: ElectionSelectorFormProps) {
    const [elections,, ] = useForm (props.elections);
    let [selectedElectionId,, resetElectionId ] = useForm (props.selectedElectionId);
    const setElectionId = (id: number) =>  {
        selectedElectionId = id;
    }
    const submitVote = () =>  {
        if (selectedElectionId != -1) {
            props.onVoteRequest(selectedElectionId);
        }
        resetElectionId();
    }
    //TODO: Use Election Name later instead of id, similar to Voter Firstname in UserIdentification
    let optionItems = props.elections.map((election) =>
    <option key={election.id}>{election.id}</option>
    );
    return (
        <form className="form">
            <div>
            <select
                className="textboxstyle"
                onChange={(e) => setElectionId(Number(e.target.value))} 
                defaultValue={selectedElectionId}
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