import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAgeState } from "@type/rank";
import { IAgeData } from "@type/userForm";

const initialState: IAgeState = {
  isOpen: false,
  selectedageStr: "",
  selectedAge: "",
};

export const agesSlice = createSlice({
  name: "age",
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
    },

    // 더보기 버튼 열고 닫을 때
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },

    // 연령별 버튼 클릭했을 때 : ages
    selectAge: (state, actions: PayloadAction<IAgeData>) => {
      state.selectedageStr = actions.payload.ageStr;
      state.selectedAge = actions.payload.age;
      state.isOpen = false;
    },

    // "전체" 버튼 클릭했을 때
    selectTotal: (state) => {
      state.selectedageStr = "";
      state.selectedAge = "";
      state.isOpen = false;
    },
  },
});

export const ageActions = agesSlice.actions;
export default agesSlice.reducer;
