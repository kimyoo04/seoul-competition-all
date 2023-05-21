import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { alertActions } from "@features/alert/alertSlice";
import { commentActions } from "@features/comment/commentSlice";

import { matchCheckComment } from "@api/comment/matchCheckComment";
import { matchCheckReview } from "@api/review/matchCheckReview";

import { useDeleteComment } from "@api/comment/deleteComment";
import { useDeleteReview } from "@api/review/deleteReview";

import { IMatchCheckCommentOrReviewForm, TId } from "@type/commentOrReview";

export default function CommentDelButton({ id }: { id: TId }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { beforeDelete, commentId, updatePwd } = useAppSelector(
    (state) => state.comment
  );
  const { mutateAsync: CommentmutateAsync } = useDeleteComment(
    router.query.id as string
  );
  const { mutateAsync: ReviewmutateAsync } = useDeleteReview(
    router.query.id as string
  );

  const { register, handleSubmit } = useForm<IMatchCheckCommentOrReviewForm>();

  const onValid: SubmitHandler<IMatchCheckCommentOrReviewForm> = async (
    data
  ) => {
    if (router.pathname.split("/")[1] === "posts") {
      const isMatch = await matchCheckComment({
        id,
        password: data.password,
      });
      if (!isMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        // 삭제 요청
        await CommentmutateAsync({ id: id, password: data.password });

        // 성공 알람 활성화
        dispatch(
          alertActions.alert({
            alertType: "Success",
            content: "댓글이 삭제되었습니다.",
          })
        );
      }
    } else {
      const reviewData = {
        educationId: router.query.id as string,
        id: id,
        ...data,
      };
      const isMatch = await matchCheckReview({
        id: reviewData.id,
        password: reviewData.password,
      });
      if (!isMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        // 삭제 요청
        await ReviewmutateAsync({ id: id, password: data.password });

        // 성공 알람 활성화
        dispatch(
          alertActions.alert({
            alertType: "Success",
            content: "댓글이 삭제되었습니다.",
          })
        );
      }
    }
  };

  return (
    <>
      {/* false && true -> false */}
      {beforeDelete && commentId === id ? (
        <form
          onSubmit={handleSubmit(onValid)}
          className="row-center relative gap-2"
        >
          <div className="absolute right-0 top-8">
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",

                minLength: {
                  value: 4,
                  message: "최소 4 글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 12,
                  message: "최대 12 글자까지 입력할 수 있어요.",
                },
              })}
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              placeholder="비밀번호"
              maxLength={13}
              className="textfield h-8 w-[100px] rounded-lg placeholder:text-sm placeholder:font-medium placeholder:text-gray_2"
            />
          </div>

          {/* 댓글 삭제 확인 버튼 */}
          <button type="submit" className="delete_btn">
            삭제
          </button>

          {/* 댓글 삭제 취소 버튼 */}
          <div
            className="create_btn cursor-pointer"
            onClick={() => dispatch(commentActions.clickCancel())}
          >
            취소
          </div>
        </form>
      ) : (
        <>
          {commentId !== id && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="delete_btn"
              onClick={() => {
                if (updatePwd === "") dispatch(commentActions.clickDelete(id));
              }}
            >
              삭제
            </motion.button>
          )}
        </>
      )}
    </>
  );
}
