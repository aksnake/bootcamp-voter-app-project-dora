import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { VoterState } from "../../models/voterApp";
import {
  replaceVoter,
  removeVoter,
  createEditVoterAction,
  createCancelVoterAction,
  createSortVotersAction,
  refreshVoters,
} from "../actions/voterActions";
// import { VoterTable } from "../components/VoterTable";
// import { voterAppStore } from "../models/voterAppStore";

export function VotersTableContainer() {
  const stateProps = useSelector((state: VoterState) => {
    return {
      unsortedVoters: state.voters,
      editVoterId: state.editVoterId,
      votersSort: state.votersSort,
    };
  });

  // const { sortCol, sortDir } = stateProps.votersSort;
  // const { unsortedVoters } = stateProps;

  // const sortedVoters = useMemo(
  //   () =>
  //     [...unsortedVoters].sort((a, b) => {
  //       if (a[sortCol] < b[sortCol]) {
  //         return sortDir === "asc" ? -1 : 1;
  //       } else if (a[sortCol] > b[sortCol]) {
  //         return sortDir === "asc" ? 1 : -1;
  //       } else {
  //         return 0;
  //       }
  //     }),
  //   [unsortedVoters, sortCol, sortDir]
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    refreshVoters()(dispatch);
  }, [dispatch]);

  const boundActionProps = useMemo(
    () =>
      bindActionCreators(
        {
          onSaveVoter: replaceVoter,
          onDeleteVoter: removeVoter,
          onEditVoter: createEditVoterAction,
          onCancelVoter: createCancelVoterAction,
          onSortVoters: createSortVotersAction,
        },
        dispatch
      ),
    [dispatch]
  );

  return <div> List Of Voters </div>
  
  // return <VoterTable {...stateProps} voters={sortedVoters} {...boundActionProps} />;
}
