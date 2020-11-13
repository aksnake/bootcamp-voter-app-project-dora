import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { createValidateUserRequestAction,createGoHomeAction } from "../actions/ballotActions";
import { VoterAppState } from "../../models/voterApp";
import { Voter } from '../../voters/models/voters';
import { UserIdentificationForm } from '../components/userIdentification';
import {
    useParams,
    useHistory,
    Route,
    Switch,
    useRouteMatch,
  } from "react-router-dom";
export type UserIdentificationFormContainerProps = {
    electionId: number,
    voters: Voter[]
};

export function UserIdentificationFormContainer(props: UserIdentificationFormContainerProps) {
    const history = useHistory();

    const routeMatch = useRouteMatch();
    //Dummy data till we use useEffect hook to pull voters data
    const voters: Voter[] = []
    const voter1: Voter = {
        id: 1,
        firstName: "Sendhil",
        lastName: "Grandhi",
        address: " 123 Some Street",
        city: "San Diego",
        birthDate: "5/1/1976",
        email: "sgrandghi@test.com",
        phone: "111-222-333"
      };
    voters.push(voter1); 


    const stateProps = useSelector((state: VoterAppState) => {
        return {
                voters: state.voters.voters,//TODO: refactor code to avoid voters.voters?
                electionId: props.electionId,
            };
        }) as {
            voters : Voter[]; 
            selectedVoterId: number,
            phoneNumber: string,
            errorMessage: string,
            electionId: number,
        };

    //TODO: This should do user validation and did user voted already for same election check and 
    //then create a ballot for the user.
    const boundActionProps =  bindActionCreators({
        onVoteRequest: createValidateUserRequestAction,
        goHome: createGoHomeAction,
    },
    useDispatch()
    );

    return <UserIdentificationForm {...stateProps}{...boundActionProps} />
}