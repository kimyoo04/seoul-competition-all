import { useAppSelector } from "@toolkit/hook";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatAlert from "./ChatAlert";

export default function Chat() {
  const isChat = useAppSelector((state) => state.chat.isChat);
  const isAlert = useAppSelector((state) => state.chat.isAlert);
  const showChat = isChat ? "" : "opacity-0 scale-0 -z-10";

  return (
    <div className={`chat-popup ${showChat} `}>
      <div className="col-center">
        {/* 헤더와 Sign out 버튼 */}
        <ChatHeader />

        {/* 저장된 최신 메시지들 */}
        <ChatMessages />

        {/* 설명, 입력창, 전송 버튼 */}
        <ChatInput />

        {/* 챗봇 답변 실패 알람 */}
        {isAlert && <ChatAlert />}
      </div>
    </div>
  );
}
