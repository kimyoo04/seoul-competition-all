import { useRouter } from "next/router";
import Link from "next/link";
import ButtonWrapper from "@components/Animation/ButtonWrapper";
import { ForwardedRef, forwardRef } from "react";
import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

interface ButtonProps {
  onClick: () => void;
  href: string;
  text: string;
}

const CustomLink = forwardRef<HTMLAnchorElement, ButtonProps>(
  function CustomLink(
    { onClick, href, text },
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    const router = useRouter();
    const pathsArr = router.asPath;

    return (
      <a href={href} onClick={onClick} ref={ref}>
        <ButtonWrapper>
          <span
            className={`text-lg ${
              pathsArr.includes(href) ? "font-bold text-main_color" : ""
            }`}
          >
            {text}
          </span>
        </ButtonWrapper>
      </a>
    );
  }
);

export default function NavLinks() {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(searchActions.resetKeyword()); // 검색 키워드 초기화
  };

  return (
    <div className="flex gap-2 text-xl font-medium  md:gap-4">
      {/* 링크들 */}
      <Link href={"/educations"} passHref legacyBehavior>
        <CustomLink href={"/educations"} onClick={onClick} text={"교육 정보"} />
      </Link>
      <Link href={"/posts"} passHref legacyBehavior>
        <CustomLink href={"/posts"} onClick={onClick} text={"자유게시판"} />
      </Link>
    </div>
  );
}
