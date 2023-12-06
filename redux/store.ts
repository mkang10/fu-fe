import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import app from "./slices/app";
import user from "./slices/user";
import authMiddleware from "./authMiddleware";
export const store = configureStore({
  reducer: {
    app: app,
    user: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
