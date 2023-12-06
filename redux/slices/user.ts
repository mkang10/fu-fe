"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type User = {
  email: string;
  UserRole: number;
  sub: string;
  isUpdated: boolean;
  moderateStatus: boolean;
};
type AppState = {
  currentUser: User;
};

const initialState: AppState = {
  currentUser: {
    email: "",
    UserRole: 0,
    sub: "",
    isUpdated: false,
    moderateStatus: false,
  },
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      setCookie("accessToken", action.payload.token, {
        maxAge: 3600,
      });
      setCookie("user_id", action.payload.user.sub, {
        maxAge: 3600,
      });
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      setCookie("accessToken", "", { maxAge: 0 });
      setCookie("user_id", "", { maxAge: 0 });
      setCookie("department", "", { maxAge: 0 });
    },
    refreshUserInfoFromStorage: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators được tạo ra cho mỗi hàm reducer
export const { login, logout, refreshUserInfoFromStorage } =
  counterSlice.actions;

export default counterSlice.reducer;
