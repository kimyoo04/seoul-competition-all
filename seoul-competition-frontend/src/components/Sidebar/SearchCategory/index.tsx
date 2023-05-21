import { TSearchCategory, TSearchCategoryKor } from "@type/search";
import { useRouter } from "next/router";

export default function SearchCategory() {
  const router = useRouter();

  const categoriesKor: TSearchCategoryKor[] = [
    "교육 정보 골라보기",
    "자유게시판 골라보기",
  ];
  const categoriesEng: TSearchCategory[] = ["educations", "posts"];

  return (
    <section>
      {categoriesKor.map((category, index) => {
        if (router.pathname.substring(1) === categoriesEng[index]) {
          return (
            <h2 key={category} className="px-3 text-h4 font-medium text-white">
              {category}
            </h2>
          );
        }
      })}
    </section>
  );
}
