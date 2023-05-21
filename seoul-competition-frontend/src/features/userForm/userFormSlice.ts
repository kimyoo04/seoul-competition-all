import { IUserFormState } from "@type/userForm";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserFormState = {
  showModal: false,
};

const userFormSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    // 사이드바 토글
    show(state) {
      state.showModal = true;
    },
    hide(state) {
      state.showModal = false;
    },
  },
});

export const userFormActions = userFormSlice.actions;
export default userFormSlice.reducer;
