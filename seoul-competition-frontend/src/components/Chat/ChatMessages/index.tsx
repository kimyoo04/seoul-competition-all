import { useAppSelector } from "@toolkit/hook";
import ChatMessage from "../ChatMessage";

import { useEffect, useRef } from "react";

export default function ChatMessages() {
  const scrollBottomDiv = useRef<HTMLDivElement>(null); // 스크롤 용 div 연결
  const messages = useAppSelector((state) => state.chat.messages); // 메시지

  // 채팅 화면 최하단으로 스크롤
  useEffect(
    () => scrollBottomDiv.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  return (
    <section className="h-[400px] w-full overflow-scroll px-1">
      {/* 메시지 출력 영역 */}
      {messages &&
        messages.map((message, indx) => (
          <ChatMessage key={`${message.id}${indx}`} message={message} />
        ))}

      {/* scroll bottom 용 div */}
      <div ref={scrollBottomDiv}></div>
    </section>
  );
}
