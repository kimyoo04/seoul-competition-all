import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@features/alert/alertSlice";
import searchReducer from "@features/search/searchSlice";
import filterReducer from "@features/filter/filterSlice";
import sidebarReducer from "@features/sidebar/sidebarSlice";
import userFormReducer from "@features/userForm/userFormSlice";
import commentReducer from "@features/comment/commentSlice";
import chatReducer from "@features/chat/chatSlice";
import interestReducer from "@features/rank/interestSlice";
import ageReducer from "@features/rank/ageSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    search: searchReducer,
    filter: filterReducer,
    sidebar: sidebarReducer,
    userForm: userFormReducer,
    comment: commentReducer,
    chat: chatReducer,
    interest: interestReducer,
    age: ageReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
