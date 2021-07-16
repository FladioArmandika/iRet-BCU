import { createStore, combineReducers } from 'redux';

import app from './app/reducer';
import { AppState } from './App/types';

export interface rootState {
  app: AppState;
}

const rootReducers = combineReducers<{ app: AppState }>({
  app,
});

const store = createStore(rootReducers);
export default store;
