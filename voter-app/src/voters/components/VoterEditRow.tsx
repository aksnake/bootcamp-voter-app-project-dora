import React, { useState, ChangeEvent } from "react";

import { Voter } from "../models/voters";

import "./styles/VoterEditRow.css";

export type VoterEditRowProps = {
  voter: Voter;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
};

export type VoterForm = {
  firstName: string;
  lastName: string;
  address : string;
  city : string;
  birthDate : string;
  email : string;
  phone : string;
};

export const VoterEditRow = (props: VoterEditRowProps) => {
  const [voterForm, setVoterForm] = useState({
    firstName: props.voter.firstName,
    lastName: props.voter.lastName,
    address: props.voter.address,
    city: props.voter.city,
    birthDate: props.voter.birthDate,
    email: props.voter.email,
    phone: props.voter.phone,

  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setVoterForm({
      ...voterForm,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const saveVoter = () => {
    props.onSaveVoter({
      ...voterForm,
      id: props.voter.id,
    });
  };

  return (
    <tr>
      <td className="col-body"></td>
      <td className="col-body">{props.voter.id}</td>
      <td className="col-body">
        <input
          type="text"
          id="firstName-input"
          name="firstName"
          value={voterForm.firstName}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <input
          type="text"
          id="lastName-input"
          name="lastName"
          value={voterForm.lastName}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <input
          type="text"
          id="address-input"
          name="address"
          value={voterForm.address}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <input
          type="text"
          id="city-input"
          name="city"
          value={voterForm.city}
          onChange={change}
        />
      </td>
      
      <td className="col-body">
        <input
          type="text"
          id="birthDate-input"
          name="birthDate"
          value={voterForm.birthDate}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <input
          type="text"
          id="email-input"
          name="email"
          value={voterForm.email}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <input
          type="text"
          id="phone-input"
          name="phone"
          value={voterForm.phone}
          onChange={change}
        />
      </td>

      <td className="col-body">
        <button type="button" onClick={saveVoter}>
          Save
        </button>
        <button type="button" onClick={props.onCancelVoter}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
