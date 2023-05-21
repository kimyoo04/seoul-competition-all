import Link from "next/link";
import ButtonWrapper from "@components/Animation/ButtonWrapper";

export default function Logo() {
  return (
    <Link href={"/"}>
      <ButtonWrapper>
        <span className="pb-[6px] pl-[4px] text-3xl font-medium text-main_color dark:text-main_color">
          Senior+
        </span>
      </ButtonWrapper>
    </Link>
  );
}
