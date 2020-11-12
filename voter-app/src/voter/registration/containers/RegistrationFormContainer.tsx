import React, { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { appendVoter } from "../actions/carToolActions";
import { RegistrationForm } from "../components/RegistrationForm";

export function RegistrationFormContainer() {
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

  return <RegistrationForm buttonText="Register" {...boundActionProps} />;
}
