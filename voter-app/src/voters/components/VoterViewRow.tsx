import React, {ChangeEvent} from "react";

import { Voter } from "../models/voters";

import "./styles/VoterViewRow.css";

export type VoterViewRowProps = {
  voter: Voter;
  onEditVoter: (voterId: number) => void;
  onDeleteVoter: (voterId: number) => void;
  onSelectVoter : (voterId: number, isChecked:boolean) => void;
};

export function VoterViewRow(props: VoterViewRowProps) {
  const deleteVoter = () => {
    props.onDeleteVoter(props.voter.id);
  };

  const selectVoter = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSelectVoter( Number(e.target.value),e.target.checked)
  }

  return (
    <tr>
      <td className="col-body">
       <input type="checkbox" id="selectVoter" name="selectVoter" value={props.voter.id} onChange={selectVoter} />  
      </td>
      <td className="col-body">{props.voter.id}</td>
      <td className="col-body">{props.voter.firstName}</td>
      <td className="col-body">{props.voter.lastName}</td>
      <td className="col-body">{props.voter.address}</td>
      <td className="col-body">{props.voter.city}</td>
      <td className="col-body">{props.voter.birthDate}</td>
      <td className="col-body">{props.voter.email}</td>
      <td className="col-body">{props.voter.phone}</td>
      <td className="col-body"> 
        <button type="button" onClick={() => props.onEditVoter(props.voter.id)}>
          Edit
        </button>
        <button type="button" onClick={deleteVoter}>
          Delete
        </button>
      </td>
    </tr>
  );
}
