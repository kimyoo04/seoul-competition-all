import { useForm } from "react-hook-form";
import { ISearchField } from "@type/search";

import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import { motion } from "framer-motion";

export default function SearchBar() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISearchField>({
    defaultValues: {},
  });

  const onValid = (data: ISearchField) => {
    // validation
    if (!data.search) return;

    // category에 따라 검색어를 추가해서 요청보내기 (trim()으로 공백 제거)
    dispatch(
      searchActions.searchKeyword({ searchKeyword: data.search.trim() })
    );

    // 인풋창 초기화
    reset({ search: "" });
  };

  return (
    <section className="z-10 w-full">
      <form className="group relative w-full" onSubmit={handleSubmit(onValid)}>
        {/* 검색어 입력 영역 */}
        <input
          {...register("search", {
            required: "검색어가 필요합니다!",
          })}
          className="textfield absolute h-8 w-full border-none pl-9 transition-all "
          id="search"
          name="search"
          placeholder={
            errors.search ? errors?.search?.message : "검색어를 입력해주세요."
          }
          autoComplete="off"
          onFocus={() => dispatch(searchActions.onFocus())}
          onClick={() => dispatch(searchActions.onFocus())}
        />

        {/* Search Icon */}
        <button
          type="submit"
          className="col-center absolute bottom-4 left-5 text-2xl font-medium "
        >
          <motion.i
            whileTap={{ scale: 0.8 }}
            className="ri-search-line absolute text-main_color transition-all"
          ></motion.i>
        </button>

        {/* Search Enter Button */}
        <button
          type="submit"
          className="col-center absolute bottom-0 right-0 h-8 rounded-r-2xl bg-sub_color  pl-2 pr-3"
        >
          <motion.span
            whileTap={{ scale: 0.8 }}
            className="text-md font-medium text-font_black"
          >
            검색
          </motion.span>
        </button>

        {/* 더미 div 태그 */}
        <div className="dummy h-8 w-full"> </div>
      </form>
    </section>
  );
}
