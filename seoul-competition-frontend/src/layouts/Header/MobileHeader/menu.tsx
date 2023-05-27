import Link from "next/link";
import { motion } from "framer-motion";
import CustomLink from "@components/CustomLink";

export default function Menu() {
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
            <CustomLink href={"/educations"} text={"교육 정보"} />
          </Link>
          <Link
            href={"/posts"}
            className="col-center w-full border-b border-main_color/30 py-2"
          >
            <CustomLink href={"/posts"} text={"자유게시판"} />
          </Link>
        </div>
      </motion.div>
    </>
  );
}
