import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@toolkit/hook";
import { alertActions } from "@features/alert/alertSlice";

import { matchCheckPostDetail } from "@api/posts/matchCheckPostDetail";
import { deletePostDetail } from "@api/posts/deletePostDetail";

import { IMatchCheckPostDetailForm, TId } from "@type/posts";

export default function UpDelButtons({ id }: { id: TId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 삭제 버튼 활성화 state
  const [isDel, setIsDel] = useState(false);

  const { register, handleSubmit } = useForm<IMatchCheckPostDetailForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IMatchCheckPostDetailForm> = async (data) => {
    // 비밀 번호 확인
    const isMatch = await matchCheckPostDetail({
      id: id,
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
      await deletePostDetail({ id: id, password: data.password });

      dispatch(
        alertActions.alert({
          alertType: "Success",
          content: "게시물이 삭제되었습니다.",
        })
      );
      // 목록 페이지 이동
      router.push("/posts");
      // 캐시 삭제 필요?
      //! --------------------
    }
  };

  return (
    <div className="row-center gap-2">
      {/* 게시글 삭제 버튼 */}
      {isDel ? (
        <>
          <form
            onSubmit={handleSubmit(onValid)}
            className="row-center relative gap-2"
          >
            <div className="absolute right-0 top-8">
              <label>비밀번호</label>
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
                placeholder="4 자 이상"
                maxLength={13}
                className=" h-8 w-[100px] rounded-lg placeholder:text-sm placeholder:font-bold placeholder:text-gray_2"
              />
            </div>

            {/* 게시글 삭제 확인 버튼 */}
            <button type="submit" className="delete_btn">
              확인
            </button>

            {/* 게시글 삭제 취소 버튼 */}
            <div
              className="create_btn cursor-pointer"
              onClick={() => setIsDel(false)}
            >
              취소
            </div>
          </form>
        </>
      ) : (
        <>
          {/* 게시글 수정 버튼 */}
          <Link href={`/posts/modify/${id}`}>
            <button className="update_btn">수정</button>
          </Link>

          {/* 게시글 삭제 버튼 */}
          <button className="delete_btn" onClick={() => setIsDel(true)}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}
