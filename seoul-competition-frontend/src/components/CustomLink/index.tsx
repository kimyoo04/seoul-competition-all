import { useRouter } from "next/router";
import ButtonWrapper from "@components/Animation/ButtonWrapper";
import { ForwardedRef, forwardRef } from "react";
import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

interface CustomLinkProps {
  href: string;
  text: string;
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  function CustomLink({ href, text }, ref: ForwardedRef<HTMLAnchorElement>) {
    const dispatch = useAppDispatch();
    const onClick = () => {
      dispatch(searchActions.resetKeyword()); // 검색 키워드 초기화
    };

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

export default CustomLink;
