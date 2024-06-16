import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { loadUsers } from "../UserSlice";

const preloadedState = {};

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState,
});

store.dispatch(loadUsers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
