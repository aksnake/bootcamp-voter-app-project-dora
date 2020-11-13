import React, {useState} from "react";

import { Voter } from "../models/voters";
import { VoterEditRow } from "./VoterEditRow";
import { VoterViewRow } from "./VoterViewRow";

import "./styles/VoterTable.css";
import { VotersSort } from "../models/voterStore";

export type VoterTableProps = {
  voters: Voter[];
  editVoterId: number;
  votersSort: VotersSort;
  onEditVoter: (voterId: number) => void;
  onDeleteVoter: (voterId: number) => void;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
  onSortVoters: (voter: keyof Voter) => void;
  onDeleteVoters: (voterIds: {voterId:number}[]) => void;
};

const sortArrow = (votersSort: VotersSort, sortCol: keyof Voter) => {
  return (
    votersSort.sortCol === sortCol && (votersSort.sortDir === "asc" ? "v" : "^")
  );
};



export function VoterTable(props: VoterTableProps) {

  const [selectedVoters, setSelectedVoters] = useState([ {voterId:-1}]);

  const selectVoter = (selectedVoterId: number, isChecked:boolean) => {
    if(isChecked && selectedVoters.indexOf({voterId:selectedVoterId}) === -1){
      setSelectedVoters([
        ...selectedVoters, { voterId: selectedVoterId} 
      ]);
    } else {
      setSelectedVoters(selectedVoters.filter((voter) => voter.voterId !== selectedVoterId ));
    }
  };

  const seletcteds = selectedVoters.filter((voter) => voter.voterId !== -1)

  return (
    <div> 
    <table id="voter-table" className="voter-table">
      <thead>
        <tr>
          <th className="col-header">
             Select
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("id")}>
              Id {sortArrow(props.votersSort, "id")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("firstName")}>
              First Name {sortArrow(props.votersSort, "firstName")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("lastName")}>
              Last Name {sortArrow(props.votersSort, "lastName")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("address")}>
              Address {sortArrow(props.votersSort, "address")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("city")}>
              City {sortArrow(props.votersSort, "city")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("birthDate")}>
              Birth Date {sortArrow(props.votersSort, "birthDate")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("email")}>
              Email {sortArrow(props.votersSort, "email")}
            </button>
          </th>
          <th className="col-header">
            <button type="button" onClick={() => props.onSortVoters("phone")}>
              Phone {sortArrow(props.votersSort, "phone")}
            </button>
          </th>
          <th className="col-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.voters.map((voter) =>
          voter.id === props.editVoterId ? (
            <VoterEditRow
              key={voter.id}
              voter={voter}
              onSaveVoter={props.onSaveVoter}
              onCancelVoter={props.onCancelVoter}
            />
          ) : (
            <VoterViewRow
              key={voter.id}
              voter={voter}
              onEditVoter={props.onEditVoter}
              onDeleteVoter={props.onDeleteVoter}
              onSelectVoter = {selectVoter}
            />
          )
        )}
      </tbody>
    </table>
    <div>
    { seletcteds.length > 0 &&
      <button type="button" onClick={ () => {
        props.onDeleteVoters(seletcteds); 
        setSelectedVoters([ {voterId:-1}]);
      }}> Delete Selected </button>
    }
    </div>
    </div>
  );
}

VoterTable.defaultProps = {
  voters: [],
};
