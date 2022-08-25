import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { loadState, saveState } from './localStorage';
import gameRegistryReducer from './gameRegistrySlice';

const rootReducer = combineReducers({
  gameRegistry: gameRegistryReducer
});

// we use `setupStore` to set up store with a preloadedState for unit testing
export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export const store = setupStore(loadState());

store.subscribe(() => saveState(store.getState()));
