import { updatePostPwd } from "@api/posts/updatePostDetail";
import ErrorMsg from "@components/TextField/ErrorMsg";
import { IUpdatePostCheck, IUpdatePostCheckForm } from "@type/posts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@toolkit/hook";
import { alertActions } from "@features/alert/alertSlice";

interface PostUpdatePwdProps {
  id: string;
  handlePassword: (password: string) => void;
}

export default function PostUpdatePwd({
  id,
  handlePassword,
}: PostUpdatePwdProps) {
  const dispatch = useAppDispatch();

  // useForm 활용
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUpdatePostCheckForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IUpdatePostCheckForm> = async (data) => {
    if (!data.password) {
      const errMsg: { [key: string]: string } = {};

      if (!data.password) errMsg.password = "비밀번호를 입력해 주세요.";

      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as "password", {
            message: value,
            type: "required",
          });
        });
      };
      setErrors(errMsg);
      return;
    }

    const checkedData: IUpdatePostCheck = {
      postId: id,
      ...data,
    };

    const isSuccess = await updatePostPwd(checkedData);
    if (isSuccess) {
      handlePassword(data.password);
    } else {
      dispatch(
        alertActions.alert({
          alertType: "Warning",
          content: "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
        })
      );
    }
  };

  return (
    <div className="w-full px-4">
      <div className="col-center mx-auto my-16 flex max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-4 text-xl font-medium text-alert_info">
            * 작성 시 입력한 비밀번호와 일치해야 합니다.
          </div>
          <form onSubmit={handleSubmit(onValid)}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-gray-700"
              >
                비밀번호를 입력해 주세요.
              </label>
              <input
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "최소 4 글자 이상 입력해주세요.",
                  },
                  maxLength: {
                    value: 12,
                    message: "최대 12 글자까지 입력 가능합니다.",
                  },
                })}
                type="password"
                id="password"
                className="w-full rounded-md border-2 border-gray-400 p-2"
              />
              <span className="mt-1 text-xs font-medium text-red-500">
                <ErrorMsg>{errors?.password?.message}</ErrorMsg>
              </span>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-md bg-main_color px-4 py-2 text-white hover:bg-blue-700"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
