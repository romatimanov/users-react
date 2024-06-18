import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { loadUsers } from "../Reducer/UserSlice";
import favoriteReducer from "../Reducer/FavoriteSlice";

const preloadedState = {};

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorites: favoriteReducer,
  },
  preloadedState,
});

store.dispatch(loadUsers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
