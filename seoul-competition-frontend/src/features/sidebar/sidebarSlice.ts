import { ISidebarState } from "@type/sidebar";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ISidebarState = {
  isSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // 사이드바 토글
    toggleSidebar(state) {
      state.isSidebar = !state.isSidebar;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice.reducer;
