import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import Logo from "@components/Logo";
import Menu from "./menu";
import MenuToggle from "./menuToggle";

import { ICurrentPage } from "@type/link";

export default function MobileHeader({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const pathsArr = router.asPath.split("/");
  const isDetailPage = router.query.id ? true : false;
  const currentPage: ICurrentPage = {
    educations: pathsArr.includes("educations"),
    posts: pathsArr.includes("posts"),
  };

  return (
    <>
      {/* 헤더 영역 */}
      {isDetailPage ? (
        <div className="container relative mx-auto grid h-16 grid-cols-3 justify-between px-4">
          {/* 디테일 페이지 헤더 */}
          <button
            className="flex items-center justify-start"
            onClick={
              () => router.push(`/${pathsArr[1]}`, undefined, { scroll: false })
              // router.back()
            }
          >
            <i className="ri-arrow-left-s-line text-4xl text-main_color"></i>
            <span className="text-lg font-medium text-main_color">목록</span>
          </button>

          <div className="col-center">
            <h2 className="text-xl font-medium text-main_color">
              {currentPage.educations
                ? "교육 정보"
                : currentPage.posts
                ? "자유게시판"
                : ""}
            </h2>
          </div>

          {/* 챗봇 토글 과 메뉴 토글 */}
          <div className="flex items-center justify-end gap-2">
            <MenuToggle showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
        </div>
      ) : (
        <div className="container relative mx-auto flex h-16 items-center justify-between px-4">
          {/* 일반 페이지 헤더 */}
          <Logo />
          <MenuToggle showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      )}

      {/* 링크 영역 */}
      {showMenu && <Menu currentPage={currentPage} />}
    </>
  );
}
