import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import { voterAppReducer } from "../reducers/voterAppReducers";

export const voterAppStore = createStore(voterAppReducer, composeWithDevTools(applyMiddleware(thunk))
);
