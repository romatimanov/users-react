import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loadUsers: (state) => {
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        state.users = JSON.parse(savedUsers);
      }
    },
  },
});

export const { addUser, loadUsers } = usersSlice.actions;
export default usersSlice.reducer;
