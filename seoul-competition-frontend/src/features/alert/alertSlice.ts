import { IAlert, IAlertState } from "@type/alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//--------------------------------------------------------------------------------
// isAlert - 알림 활성 / 알림 비활성
// alertType - 알림의 종류, 제목, 아이콘, 색깔을 설정
// content - 알림의 내용을 설정
//--------------------------------------------------------------------------------

const initialState: IAlertState = {
  isAlert: false,
  alertType: "",
  content: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    // 알림 활성화 및 일림 제목, 알림 내용 메시지 전달
    alert(state, action: PayloadAction<IAlert>) {
      state.isAlert = true;
      state.alertType = action.payload.alertType;
      state.content = action.payload.content;
    },

    // 알림 비활성화
    alertClose(state) {
      state.isAlert = false;
      state.alertType = "";
      state.content = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
