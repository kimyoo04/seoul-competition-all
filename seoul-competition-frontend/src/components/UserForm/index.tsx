import { IUserForm } from "@type/userForm";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  genders,
  ageDataArr,
  locations,
  interests,
} from "@constants/userForm/userFormData";
import classNames from "classnames";
import createUser from "@api/user/createUser";
import { motion } from "framer-motion";
import { useAppDispatch } from "@toolkit/hook";
import { userFormActions } from "@features/userForm/userFormSlice";
import { alertActions } from "@features/alert/alertSlice";

export default function UserForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<IUserForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IUserForm> = async (data) => {
    if (
      !data.age ||
      !data.gender ||
      data.location === "" ||
      data.interest === "" ||
      !data.confirm
    ) {
      const errMsg: { [key: string]: string } = {};

      if (!data.gender) errMsg.gender = "성별을 골라주세요.";
      if (!data.age) errMsg.age = "연령대를 골라주세요.";
      if (data.location === "") errMsg.location = "거주 지역을 골라주세요.";
      if (data.interest === "") errMsg.interest = "관심사를 골라주세요.";
      if (!data.confirm) errMsg.confirm = "동의를 해주세요";

      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(
            key as "gender" | "age" | "location" | "interest" | "confirm",
            {
              message: value,
              type: "required",
            }
          );
        });
      };

      setErrors(errMsg);
      return;
    }

    // JWT 토큰 생성 및 쿠키에 저장
    const isUser = await createUser(data);
    if (isUser) {
      // 유저폼 비활성화
      dispatch(userFormActions.hide());
    } else {
      // 에러 메시지 표시
      dispatch(
        alertActions.alert({
          alertType: "Info",
          content: "서버에서 오류가 발생했습니다.",
        })
      );
    }
  };

  return (
    <>
      {/* 오버레이 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/60"
      ></motion.div>

      {/* 유저 폼 영역 */}
      {genders && ageDataArr && locations && interests && (
        <div className="col-center relative left-0 right-0">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-start absolute z-40 gap-4 rounded-2xl bg-white p-8"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="col-start gap-2">
              <div className="row-start gap-4">
                <span className="font-bold">성별</span>
                <span className="text-sm text-main_color">
                  {errors.gender?.message}
                </span>
              </div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  return (
                    <div {...field} className="grid grid-cols-2 gap-3">
                      {genders.map((gender) => {
                        return (
                          <label
                            htmlFor={gender}
                            key={gender}
                            className={`undraggable rounded-2xl border border-main_color px-3 py-0.5 transition-all ${classNames(
                              {
                                "bg-main_color font-bold text-font_white shadow-md":
                                  field.value == gender,
                              }
                            )}`}
                          >
                            <input
                              type="radio"
                              id={gender}
                              name={gender}
                              value={gender}
                              checked={field.value == gender}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                              }}
                              className="hidden"
                            />
                            {gender}
                          </label>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </div>

            <div className="col-start gap-2">
              <div className="row-start gap-4">
                <span className="font-bold">연령대</span>
                <span className="text-sm text-main_color">
                  {errors.age?.message}
                </span>
              </div>
              <Controller
                name="age"
                control={control}
                render={({ field }) => {
                  return (
                    <div
                      {...field}
                      className="grid w-full grid-cols-2 justify-stretch gap-3 sm:grid-cols-3"
                    >
                      {ageDataArr.map((data) => {
                        return (
                          <label
                            htmlFor={data.age}
                            key={data.age}
                            className={`undraggable rounded-2xl border border-main_color px-3 py-0.5 transition-all ${classNames(
                              {
                                "bg-main_color font-bold text-font_white shadow-md":
                                  field.value === data.age,
                              }
                            )}`}
                          >
                            <input
                              type="radio"
                              id={data.age}
                              name={data.age}
                              value={data.age}
                              checked={field.value == data.age}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                              }}
                              className="hidden"
                            />
                            {data.ageStr}
                          </label>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </div>

            <div className="col-start relative w-full gap-2">
              <div className="row-start gap-4">
                <span className="font-bold">거주 지역</span>
                <span className="text-sm text-main_color">
                  {errors.location?.message}
                </span>
              </div>
              <select
                {...register("location")}
                className="w-full appearance-none rounded-2xl border border-main_color py-0.5 pl-2 outline-none"
              >
                <option value={""}>- 클릭해주세요. -</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-[27px] flex items-center">
                <i className="ri-arrow-down-s-line text-4xl text-main_color"></i>
              </div>
            </div>

            <div className="col-start relative w-full gap-2">
              <div className="row-start gap-4">
                <span className="font-bold">관심사</span>
                <span className="text-sm text-main_color">
                  {errors.interest?.message}
                </span>
              </div>
              <select
                {...register("interest")}
                className="w-full appearance-none rounded-2xl border border-main_color py-0.5 pl-2 outline-none"
              >
                <option value={""}>- 클릭해주세요. -</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-[27px] flex items-center">
                <i className="ri-arrow-down-s-line text-4xl text-main_color"></i>
              </div>
            </div>

            {/* 동의 버튼 */}
            <Controller
              name="confirm"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <>
                  <label
                    {...field}
                    htmlFor="confirm"
                    className={`row-center ${
                      field.value
                        ? "font-bold"
                        : errors.confirm?.message
                        ? "text-main_color"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="confirm"
                      className="mr-3 h-5 w-5 border-none shadow-none"
                    />
                    정보의 확인 및 사용에 동의합니다.
                  </label>
                </>
              )}
            />

            {/* 확인 버튼 */}
            <motion.button
              whileTap={{ scale: 0.9, transition: { duration: 0.05 } }}
              type="submit"
              className="accent_btn_border col-center h-8 w-full transition-all hover:bg-main_color hover:text-font_white"
            >
              확인하기
            </motion.button>

            {/* 닫기 버튼 */}
            <div
              className="absolute right-8 top-8 z-50"
              onClick={() => dispatch(userFormActions.hide())}
            >
              <i className="ri-close-fill text-2xl text-black"></i>
            </div>
          </motion.form>
        </div>
      )}
    </>
  );
}
