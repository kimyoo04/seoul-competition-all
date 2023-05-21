import { putFeedback } from "@api/chat/putFeedback";
import { chatActions } from "@features/chat/chatSlice";
import { IMessage } from "@type/chat";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ChatMessage({ message }: { message: IMessage }) {
  const dispatch = useDispatch();

  const isChatbot = message.id !== "client"; // 챗봇인지 유저인지
  const messagePos = isChatbot ? "received-text" : "sent-text"; // 메세지 위치
  const messageBg = isChatbot ? "received-bg" : "sent-bg"; // 메세지 배경

  return (
    <div className={`${messagePos} px-1 py-1`}>
      {/* 챗봇의 프로필 이미지 */}
      {isChatbot && (
        <Image
          src={"/images/chatbot.png"}
          className="rounded-xl"
          width={36}
          height={36}
          quality={50}
          alt={"chatbot"}
        />
      )}

      {/* 메시지 */}
      <div className={`chat-textbox ${messageBg}`}>
        {/* 텍스트 영역 */}
        <p className="text-sm">
          {isChatbot ? message.answer : message.question}
        </p>

        {/* 챗봇 답변 피드백 영역 */}
        {isChatbot && message.id !== -1 && (
          <div className="col-center hidden gap-1 group-hover:block">
            {message.feedback === true ? (
              <i
                className="ri-thumb-up-fill text-main_color"
                onClick={async () => {
                  const isDone = await putFeedback(message.id as number, true);
                  if (isDone)
                    dispatch(chatActions.cancelFeedback(message.id as number));
                }}
              ></i>
            ) : (
              <i
                className="ri-thumb-up-line"
                onClick={async () => {
                  const isDone = await putFeedback(message.id as number, null);
                  if (isDone)
                    dispatch(
                      chatActions.sendTrueFeedback(message.id as number)
                    );
                }}
              ></i>
            )}
            {message.feedback === false ? (
              <i
                className="ri-thumb-down-fill text-main_color"
                onClick={async () => {
                  const isDone = await putFeedback(message.id as number, false);
                  if (isDone)
                    dispatch(chatActions.cancelFeedback(message.id as number));
                }}
              ></i>
            ) : (
              <i
                className="ri-thumb-down-line"
                onClick={async () => {
                  const isDone = await putFeedback(message.id as number, null);
                  if (isDone)
                    dispatch(
                      chatActions.sendFalseFeedback(message.id as number)
                    );
                }}
              ></i>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
