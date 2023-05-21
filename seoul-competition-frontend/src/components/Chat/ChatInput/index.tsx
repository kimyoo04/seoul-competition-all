import { useForm } from "react-hook-form";
import { ISendForm } from "@type/chat";

import { useAppDispatch } from "@toolkit/hook";
import { chatActions } from "@features/chat/chatSlice";
import { sendQuestion } from "@api/chat/sendQuestion";

export default function ChatInput() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<ISendForm>();

  const onValid = async (data: ISendForm) => {
    if (data.question === "") return; // 빈칸 예외처리

    // 질문 전송 및 답변 받는 로직
    const answerData = await sendQuestion(data.question);
    if (answerData) {
      // 질문 저장
      dispatch(
        chatActions.sendQuestion({ id: "client", question: data.question })
      );
      // 답변 저장
      dispatch(
        chatActions.getAnswer({
          id: answerData.id,
          answer: answerData.answer,
          feedback: null,
        })
      );
    } else {
      // 알람 활성화
      dispatch(
        chatActions.getAlert({
          alertMsg: "챗봇이 답변을 하지 못했습니다.",
        })
      );
      return; // 예외처리
    }

    reset({ question: "" }); // 전송 후 텍스트 지우기
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col justify-between border-t border-main_color"
    >
      {/* 텍스트 입력창 */}
      <div className="flex h-10 w-full items-end justify-between bg-gray-100">
        <input
          id="question"
          type="text"
          className="h-full w-full rounded-none bg-transparent p-2 shadow-none transition-none focus:bg-white focus:outline-none"
          placeholder="챗봇에게 질문을 해보세요."
          autoComplete={"off"}
          maxLength={70}
          {...register("question", { required: true, maxLength: 70 })}
        />

        {/* 전송 버튼 */}
        <button className="row-center h-full w-20 bg-main_color" type="submit">
          <i className="ri-arrow-right-up-line text-xl text-font_white"></i>
          <span className="text-font_white">전송</span>
        </button>
      </div>
    </form>
  );
}
