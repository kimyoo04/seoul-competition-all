import React from "react";
import { useRouter } from "next/router";
import { timeYmd } from "@util/dateTime";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import CommentDelButton from "./CommentDelButton";
import CommentUpdatePwd from "./CommentUpdatePwd";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { alertActions } from "@features/alert/alertSlice";
import { commentActions } from "@features/comment/commentSlice";

import { useUpdateComment } from "@api/comment/updateComment";
import { useUpdateReview } from "@api/review/updateReview";

import {
  ICommentOrReview,
  IUpdateCommentOrReview,
  IUpdateCommentOrReviewForm,
} from "@type/commentOrReview";

interface ICommentProps {
  data: ICommentOrReview;
  index: number;
}

// 댓글 배경 컬러
const color = ["bg-[#FBFBFB]", "bg-[#F5F5F5}"];

export default function CommentItem({ data, index }: ICommentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { updatePwd, commentId } = useAppSelector((state) => state.comment);
  const { mutateAsync: CommentmutateAsync } = useUpdateComment(
    router.query.id as string
  );
  const { mutateAsync: ReviewmutateAsync } = useUpdateReview(
    router.query.id as string
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<IUpdateCommentOrReviewForm>({
    // 초기값 지정
    defaultValues: { nickname: data.nickname, content: data.content },
  });

  const onvalid: SubmitHandler<IUpdateCommentOrReviewForm> = async (
    formData
  ) => {
    //  폼 데이터 유효성 검사
    if (!formData.nickname || !formData.content) {
      const errMsg: { [key: string]: string } = {};

      if (!data.nickname) errMsg.nickname = "이름 또는 닉네임을 입력해 주세요.";
      if (!data.content) errMsg.content = "내용을 입력해 주세요.";
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          // 폼 구성 요소 이름 및 에러 메시지 전달
          setError(key as "nickname" | "content", {
            message: value,
            type: "required",
          });
        });
      };
      // 데이터가 유효하지 않을 경우의 에러 메시지 설정
      setErrors(errMsg);
      return;
    }
    if (router.pathname.split("/")[1] === "posts") {
      const commentData: IUpdateCommentOrReview = {
        id: data.id,
        password: updatePwd,
        ...formData,
      };

      // 자유게시판의 댓글 수정
      await CommentmutateAsync(commentData);

      // commentState 초기화
      dispatch(commentActions.resetComment());

      // 성공 알람 활성화
      dispatch(
        alertActions.alert({
          alertType: "Success",
          content: "댓글이 수정되었습니다.",
        })
      );
    } else {
      const reviewData: IUpdateCommentOrReview = {
        id: data.id,
        password: updatePwd,
        ...formData,
      };

      // 교육 정보의 리뷰 수정
      await ReviewmutateAsync(reviewData);

      // commentState 초기화
      dispatch(commentActions.resetComment());

      // 성공 알람 활성화
      dispatch(
        alertActions.alert({
          alertType: "Success",
          content: "댓글이 수정되었습니다.",
        })
      );
    }
  };

  return (
    <>
      {updatePwd !== "" && commentId == data.id ? (
        <form
          className={`p-4 ${color[Math.round(index % 2)]}`}
          onSubmit={handleSubmit(onvalid)}
        >
          <div className="flex items-center justify-between">
            {/* 닉네임 필드 */}
            <div className="mb-2 flex w-1/2 items-center gap-2">
              <div className="relative">
                <label
                  htmlFor="nickname-update"
                  className="absolute left-4 top-1 font-medium"
                >
                  닉네임 :
                </label>

                <input
                  {...register("nickname", {
                    required: "이름이 필요해요.",
                    minLength: {
                      value: 2,
                      message: "최소 두 글자 이상 입력해 주세요.",
                    },
                    maxLength: {
                      value: 10,
                      message: "최대 10 글자까지 입력할 수 있어요.",
                    },
                  })}
                  id="nickname-update"
                  type="text"
                  name="nickname"
                  autoComplete="off"
                  placeholder="별명"
                  maxLength={11}
                  className="textfield h-8 w-52 rounded-lg pl-20 placeholder:text-sm"
                />
              </div>

              <span className="mt-1 text-xs font-medium text-red-500">
                {errors?.nickname?.message}
              </span>
            </div>
            <div className="row-start gap-2">
              {/* 댓글 수정 확인 버튼 */}
              <button type="submit" className="create_btn">
                수정
              </button>

              {/* 댓글 수정 취소 버튼 */}
              <button
                className="update_btn cursor-pointer"
                onClick={() => {
                  dispatch(commentActions.resetComment());
                }}
              >
                취소
              </button>
            </div>
          </div>

          {/* 댓글 입력 필드 */}
          <div>
            <Controller
              {...register("content", {
                required: "댓글을 작성해 주세요.",
                minLength: {
                  value: 3,
                  message: "최소 세 글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 500,
                  message: "최대 500 글자까지 입력할 수 있어요.",
                },
              })}
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content"
                  name="content"
                  rows={2}
                  className="textfield w-full resize-none rounded-lg bg-white px-4 py-2 shadow-sm shadow-gray_3 transition-all duration-300 placeholder:text-sm"
                  placeholder="자유롭게 댓글을 작성해 보세요."
                  maxLength={501}
                />
              )}
            />

            <span className="mt-1 text-xs font-medium text-red-500">
              {errors?.content?.message}
            </span>
          </div>
        </form>
      ) : (
        <div key={data.id} className={`p-4 ${color[Math.round(index % 2)]}`}>
          <div className="flex flex-wrap justify-between">
            <div className="my-2 text-sm">
              {/* 댓글 작성자 닉네임, 작성일, 상대적 시간 */}
              <span>{data.nickname}</span>
              <span className="mx-2 text-xs">|</span>
              <span>{timeYmd(data.createdAt)}</span>
            </div>

            {/* 수정, 삭제 버튼 */}
            <div className="row-center">
              <CommentUpdatePwd id={data.id} />
              <CommentDelButton id={data.id} />
            </div>
          </div>

          <div className="text-font_black ">{data.content}</div>
        </div>
      )}
    </>
  );
}
