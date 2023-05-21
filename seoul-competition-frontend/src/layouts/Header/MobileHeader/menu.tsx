import Link from "next/link";
import { motion } from "framer-motion";

import ButtonWrapper from "@components/Animation/ButtonWrapper";
import { ICurrentPage } from "@type/link";

export default function Menu({ currentPage }: { currentPage: ICurrentPage }) {
  return (
    <>
      <motion.div
        key={"menu"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-16 w-screen bg-white font-medium shadow-sm"
      >
        <div className="col-center border-t border-main_color/30">
          <Link
            href={"/educations"}
            className="col-center w-full border-b border-main_color/30 py-2"
          >
            <ButtonWrapper>
              <span
                className={`text-lg ${
                  currentPage.educations ? "font-bold text-main_color" : ""
                }`}
              >
                교육 정보
              </span>
            </ButtonWrapper>
          </Link>
          <Link
            href={"/posts"}
            className="col-center w-full border-b border-main_color/30 py-2"
          >
            <ButtonWrapper>
              <span
                className={`text-lg ${
                  currentPage.posts ? "font-bold text-main_color" : ""
                }`}
              >
                자유게시판
              </span>
            </ButtonWrapper>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
