import { IChatAlert, IChatState, IFeedback, IMessage } from "@type/chat";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IChatState = {
  isChat: false,
  isAlert: false,
  alertMsg: "",
  messages: [
    {
      id: -1,
      answer: "안녕하세요! 저는 Senior+ 챗봇입니다. 무엇을 도와드릴까요?",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 챗봇 활성화/비활성화
    openChat(state) {
      state.isChat = true;
      state.messages = [];
    },

    closeChat(state) {
      state.isChat = false;
      state.messages = [];
    },
    toggleChat(state) {
      state.isChat = !state.isChat;
      state.messages = [
        {
          id: -1,
          answer: "안녕하세요! 저는 Senior+ 챗봇입니다. 무엇을 도와드릴까요?",
        },
      ];
    },

    // 질문과 답변의 데이터를 state에 추가
    sendQuestion(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
    getAnswer(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },

    // 피드백 데이터를 state에 추가
    sendTrueFeedback(state, action: PayloadAction<number>) {
      const itemIndex = state.messages.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) state.messages[itemIndex].feedback = true;
    },
    sendFalseFeedback(state, action: PayloadAction<number>) {
      const itemIndex = state.messages.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) state.messages[itemIndex].feedback = false;
    },
    cancelFeedback(state, action: PayloadAction<number>) {
      const itemIndex = state.messages.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) state.messages[itemIndex].feedback = null;
    },

    // 응답에 실패했을 때 알람 메시지 활성화
    getAlert(state, action: PayloadAction<IChatAlert>) {
      state.isAlert = true;
      state.alertMsg = action.payload.alertMsg;
    },
    // 알람 메시지 비활성화
    hideAlert(state) {
      state.isAlert = false;
      state.alertMsg = "";
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
