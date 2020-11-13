import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Voter } from "../../voter/models/voters";
import { UserIdentificationFormContainer } from "../containers/userIdentificationContainer";
export function UserValidation() {
  //TODO: Add it to state, write Action/Reducer... and replace code using URL parameter?
  const { id } = useParams<{id: string}>();
  const stateProps = useSelector(() => {
    return {
            electionId: Number(id),
        };
    });
  return (
    <>
      <UserIdentificationFormContainer {...stateProps}/>
    </>
  );
}
