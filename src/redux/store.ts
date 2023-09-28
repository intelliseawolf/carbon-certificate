import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";

import certificateSlice from "./modules/certificateSlice";

export const store = configureStore({
  reducer: {
    certificate: certificateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      certificate: certificateSlice,
    },
    preloadedState,
  });
}
