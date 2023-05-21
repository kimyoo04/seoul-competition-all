import { chatActions } from "@features/chat/chatSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function ChatHeader() {
  const dispatch = useAppDispatch();

  return (
    <header className="chat-header">
      <h2>Senior+ Chat</h2>
      <div
        className="col-center h-8 w-8"
        onClick={() => dispatch(chatActions.closeChat())}
      >
        <i className="ri-close-line text-2xl font-bold text-font_white"></i>
      </div>
    </header>
  );
}
