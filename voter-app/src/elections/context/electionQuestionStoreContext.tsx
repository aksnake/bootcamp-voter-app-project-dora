import React, {createContext, useContext} from 'react';
import {ElectionQuestionStore, useElectionQuestionStore} from "../hooks/useElectionQuestionStore";

const electionQuestionStoreContext = createContext({} as ElectionQuestionStore);

export type ElectionQuestionProviderProps = {
    children: React.ReactNode;
};

export const ElectionQuestionStoreProvider =     ({children}: ElectionQuestionProviderProps) => {

    return (<electionQuestionStoreContext.Provider value={useElectionQuestionStore([])}>
                {children}
            </electionQuestionStoreContext.Provider>
    );
};

export const useElectionQuestionStoreContext = () => {
    return useContext(electionQuestionStoreContext);
};

