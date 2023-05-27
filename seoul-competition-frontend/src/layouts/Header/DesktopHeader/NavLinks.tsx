import Link from "next/link";

import CustomLink from "@components/CustomLink";

export default function NavLinks() {
  return (
    <div className="flex gap-2 text-xl font-medium  md:gap-4">
      <Link href={"/educations"} passHref legacyBehavior>
        <CustomLink href={"/educations"} text={"교육 정보"} />
      </Link>

      <Link href={"/posts"} passHref legacyBehavior>
        <CustomLink href={"/posts"} text={"자유게시판"} />
      </Link>
    </div>
  );
}
