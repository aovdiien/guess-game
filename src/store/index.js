import { configureStore } from '@reduxjs/toolkit';
import gameRegistryReducer from './gameRegistrySlice';

export const store = configureStore({
  reducer: {
    gameRegistry: gameRegistryReducer
  }
});
