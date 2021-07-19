import { createStore, combineReducers } from "redux";

import app from "@stores/app/reducer";
import { AppState } from "@stores/app/types";

export interface rootState {
  app: AppState;
}

const rootReducers = combineReducers<{ app: AppState }>({
  app,
});

const store = createStore(rootReducers);
export default store;
