import React, {ChangeEvent, useState} from 'react' 
import { useParams } from 'react-router-dom';
import { UserValidationState } from '../models/ballotStore';
import { Voter } from '../../voters/models/voters';
import "../../components/VoterApp.css";

export type UserIdentificationFormProps = {
    voters: Voter[],
    selectedVoterId: number,
    phoneNumber: string,
    errorMessage: string,
    electionId: number,
    onVoteRequest: (userValidationState: UserValidationState) => void;
    goHome:()=>void;
};

export function UserIdentificationForm(props: UserIdentificationFormProps) {
    const { id } = useParams<{id: string}>();
    const [voterForm, setVoterForm] = useState({
        selectedVoterId: -1,
        phoneNumber: props.phoneNumber,
        electionId: id,
      });
      
    
      const change = (e: ChangeEvent<HTMLInputElement>) => {
        setVoterForm({
          ...voterForm,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
      };

    const setVoter = (voterName: string) =>  {
        //Expecting only one entry now.
        const voterId = props.voters.filter(voter => voter.firstName === voterName).map((voter) => voter.id).pop()
        if (voterId != undefined) {
            setVoterForm({
                ...voterForm,
                selectedVoterId: voterId,
              });
        }
    }
    const submitVote = () =>  {
        if (voterForm.selectedVoterId !== -1 && voterForm.phoneNumber !== undefined) {
            const userValidationState: UserValidationState = {voterId: voterForm.selectedVoterId, phoneNumber: voterForm.phoneNumber};
            props.onVoteRequest(userValidationState);
        }
    }
    //TODO: We need a unique name for voter to select here.
    let optionItems = props.voters.map((voter) =>
    <option key={voter.id}>{voter.firstName}</option>
    );
    return (
        <form className="form"> 
            <button type="button" className='back-button' onClick={props.goHome}>
                Go Home
            </button>
            <div>
            <select
                className="textboxstyle"
                onChange={(e) => setVoter(e.target.value)} 
                >
                <option key='-1'>Select Voter</option>
                {optionItems}
                </select>
            </div>
            <div>
                <label>Enter Phone Number :</label>
                </div>
            <div>
                <input
                type="text"
                id="phone-input"
                name="phoneNumber"
                value={voterForm.phoneNumber}
                onChange={change}
                />
            </div>
            <button type="button"  onClick={submitVote}>
                Vote
            </button>
        </form>
    )
}