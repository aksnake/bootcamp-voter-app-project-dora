import React, { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { appendVoter } from "../actions/voterActions";
import { VoterRegistration } from "../components/VoterRegistration";

export function VoterRegistrationContainer() {
  const dispatch = useDispatch();

  const boundActionProps = useMemo(
    () =>
      bindActionCreators(
        {
          onRegisterVoter: ( appendVoter ),
        },
        dispatch
      ),
    [dispatch]
  );

  return <VoterRegistration buttonText="Register" {...boundActionProps} />;
}
