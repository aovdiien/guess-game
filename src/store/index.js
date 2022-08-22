import { configureStore } from '@reduxjs/toolkit';

import { loadState, saveState } from './localStorage';
import gameRegistryReducer from './gameRegistrySlice';

export const store = configureStore({
  reducer: {
    gameRegistry: gameRegistryReducer
  },
  preloadedState: loadState()
});

store.subscribe(() => saveState(store.getState()));
