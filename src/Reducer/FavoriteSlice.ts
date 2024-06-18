import { createSlice } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: number[];
}

const initialState: FavoriteState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const userId = action.payload;
      if (state.favorites.includes(userId)) {
        state.favorites = state.favorites.filter((id: number) => id !== userId);
      } else {
        state.favorites.push(userId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
