// 상태 슬라이스 파일 (예: interestSlice.js)
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInterestState } from "@type/rank";
import { TInterest } from "@type/userForm";

const initialState: IInterestState = {
  isOpen: false,
  selectedInterest: "",
};

export const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
    },

    // 더보기 버튼 열고 닫을 때
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },

    // 관심사별 버튼 클릭했을 때
    selectInterest: (state, actions: PayloadAction<TInterest>) => {
      state.selectedInterest = actions.payload;
      state.isOpen = false;
    },

    // "전체" 버튼 클릭했을 때
    selectTotal: (state) => {
      state.selectedInterest = "";
      state.isOpen = false;
    },
  },
});

export const interestActions = interestSlice.actions;
export default interestSlice.reducer;
