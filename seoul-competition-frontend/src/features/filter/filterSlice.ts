import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IFilterState,
  IStatus,
  IEndDate,
  IStartDate,
  IBothDate,
  IMinPrice,
  IMaxPrice,
  ITotalCounts,
} from "@type/filter";

const initialState: IFilterState = {
  isClicked: false,
  status: "전체",
  startDate: "",
  endDate: "",
  minPrice: "0",
  maxPrice: "100000",
  totalCounts: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // 교육 상태 업데이트
    toggleStatus: (state, action: PayloadAction<IStatus>) => {
      state.isClicked = true;
      state.status = action.payload.status;
    },

    // 교육 기간 업데이트
    setStartDate: (state, action: PayloadAction<IStartDate>) => {
      state.isClicked = true;
      state.startDate = action.payload.startDate;
    },
    setEndDate: (state, action: PayloadAction<IEndDate>) => {
      state.isClicked = true;
      state.endDate = action.payload.endDate;
    },
    setBothDate: (state, action: PayloadAction<IBothDate>) => {
      state.isClicked = true;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },

    // 교육 가격 업데이트
    setMinPrice: (state, action: PayloadAction<IMinPrice>) => {
      state.isClicked = true;
      state.minPrice = action.payload.minPrice;
    },
    setMaxPrice: (state, action: PayloadAction<IMaxPrice>) => {
      state.isClicked = true;
      state.maxPrice = action.payload.maxPrice;
    },

    // 필터링 된 개수 업데이트
    setTotalCounts: (state, action: PayloadAction<ITotalCounts>) => {
      state.totalCounts = action.payload.totalCounts;
    },

    resetParams: (state) => {
      state.isClicked = false;
      state.status = "전체";
      state.startDate = "";
      state.endDate = "";
      state.minPrice = "0";
      state.maxPrice = "100000";
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
