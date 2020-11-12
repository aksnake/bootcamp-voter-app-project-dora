import React, { useState, ChangeEvent } from "react";

import { NewVoter } from "../models/voters";

export type RegistrationFormProps = {
  buttonText: string;
  onRegisterVoter: (newVoter: NewVoter) => void;
};

export function RegistrationForm(props: RegistrationFormProps) {
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    address :"",
    city : "",
    birthDate : "",
    email : "",
    phone : "",
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    props.onRegisterVoter({
      ...registrationForm,
    });

    setRegistrationForm({
      firstName: "",
      lastName: "",
      address :"",
      city : "",
      birthDate : "",
      email : "",
      phone : "",
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="firstName-input">First Name</label>
        <input
          type="text"
          id="firstName-input"
          name="firstName"
          value={registrationForm.firstName}
          onChange={change}
        />
      </div>

      <div>
        <label htmlFor="lastName-input">Last Name</label>
        <input
          type="text"
          id="lastName-input"
          name="lastName"
          value={registrationForm.lastName}
          onChange={change}
        />
      </div>

      <div>
        <label htmlFor="address-input">Address</label>
        <input
          type="text"
          id="address-input"
          name="address"
          value={registrationForm.address}
          onChange={change}
        />
      </div>

      <div>
        <label htmlFor="city-input">City</label>
        <input
          type="text"
          id="city-input"
          name="city"
          value={registrationForm.city}
          onChange={change}
        />
      </div>


      <div>
        <label htmlFor="birthDate-input">Birth Date</label>
        <input
          type="text"
          id="birthDate-input"
          name="birthDate"
          value={registrationForm.birthDate}
          onChange={change}
        />
      </div>

      <div>
        <label htmlFor="email-input">Email</label>
        <input
          type="text"
          id="email-input"
          name="email"
          value={registrationForm.email}
          onChange={change}
        />
      </div>


      <div>
        <label htmlFor="phone-input">Phone</label>
        <input
          type="text"
          id="phone-input"
          name="phone"
          value={registrationForm.phone}
          onChange={change}
        />
      </div>

      <button type="button" onClick={register}>
        {props.buttonText}
      </button>
    </form>
  );
}
