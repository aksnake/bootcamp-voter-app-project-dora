import React, {createContext, useContext} from 'react';
import {ElectionStore, useElectionStore} from "../hooks/useElectionStore";

const electionStoreContext = createContext({} as ElectionStore);

export type ElectionProviderProps = {
    children: React.ReactNode;
};

export const ElectionStoreProvider =     ({children}: ElectionProviderProps) => {

    return (<electionStoreContext.Provider value={useElectionStore(-1)}>
                {children}
            </electionStoreContext.Provider>
    );
};

export const useElectionStoreContext = () => {
    return useContext(electionStoreContext);
};
