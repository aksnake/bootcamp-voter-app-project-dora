import {useState} from 'react';

export type ViewResults = (electionIdToView: number) => void;
export type ElectionStore = [ 
                            viewResultsElectionId: number, 
                            viewResults: (electionIdToView: number) => void,
                         ]

export type UseElectionStore = (initialViewResultsElectionId: number) => ElectionStore;

export const useElectionStore: UseElectionStore = (initialViewResultsElectionId) => {
    const [viewResultsElectionId, setViewResultsElectionId] = useState(initialViewResultsElectionId);
    
    const viewResultsHook: ViewResults = (electionIdToView: number) => {
        setViewResultsElectionId(electionIdToView);
    }
    
    return [ viewResultsElectionId, viewResultsHook];
};
