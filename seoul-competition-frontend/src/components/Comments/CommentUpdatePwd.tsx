import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { commentActions } from "@features/comment/commentSlice";
import { alertActions } from "@features/alert/alertSlice";

import { matchCheckComment } from "@api/comment/matchCheckComment";
import { matchCheckReview } from "@api/review/matchCheckReview";

import { IMatchCheckCommentOrReviewForm, TId } from "@type/commentOrReview";

// 기존 commnet, review 데이터와 pwd 체크 시 입력 받은 password
export default function CommentUpdatePwd({ id }: { id: TId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { beforeUpdate, commentId, updatePwd } = useAppSelector(
    (state) => state.comment
  );

  const { register, handleSubmit } = useForm<IMatchCheckCommentOrReviewForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IMatchCheckCommentOrReviewForm> = async ({
    password,
  }) => {
    if (router.pathname.split("/")[1] === "posts") {
      const isCommentMatch = await matchCheckComment({
        id,
        password,
      });

      if (!isCommentMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        // password를 state에 저장
        dispatch(commentActions.updatePwdCheck(password));
      }
    } else {
      const isReviewMatch = await matchCheckReview({
        id,
        password,
      });

      if (!isReviewMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        // password를 state에 저장
        dispatch(commentActions.updatePwdCheck(password));
      }
    }
  };

  return (
    <>
      {beforeUpdate && commentId === id ? (
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

          {/* 댓글 수정 확인 버튼 */}
          <button type="submit" className="delete_btn">
            확인
          </button>

          {/* 댓글 수정 취소 버튼 */}
          <button
            className="create_btn cursor-pointer"
            onClick={() => dispatch(commentActions.resetComment())}
          >
            취소
          </button>
        </form>
      ) : (
        <>
          {/* id불일치 */}
          {commentId !== id && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="update_btn mr-2"
              onClick={() => {
                if (updatePwd === "") dispatch(commentActions.clickUpdate(id));
              }}
            >
              수정
            </motion.button>
          )}
        </>
      )}
    </>
  );
}
