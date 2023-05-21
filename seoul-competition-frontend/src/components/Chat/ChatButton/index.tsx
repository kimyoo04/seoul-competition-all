import { chatActions } from "@features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

// 채팅창 토글 버튼
export default function ChatButton() {
  const dispatch = useAppDispatch();
  const isChat = useAppSelector((state) => state.chat.isChat);
  const chatBtnBg = isChat
    ? "bg-main_color shadow-gray_1"
    : "bg-white shadow-gray_1";
  const chatBtnDot = isChat ? "text-font_white" : "text-main_color";

  return (
    <button
      className={`row-center fixed bottom-6 right-4 h-10  w-10 gap-0.5 rounded-full  rounded-br-none shadow-sm transition-all hover:scale-125 ${chatBtnBg}`}
      onClick={() => dispatch(chatActions.toggleChat())}
    >
      {/* 점 3개 표현 */}
      <div className={`text-3xl font-bold ${chatBtnDot}`}>?</div>
    </button>
  );
}
