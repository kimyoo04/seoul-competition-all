import { TContent } from "@type/posts";
import React from "react";

interface IContentProps {
  data: TContent;
}

export default function Content({ data }: IContentProps) {
  return (
    <>
      {/* 내용 영역*/}
      <div className="mb-16 text-font_black ">{data}</div>
    </>
  );
}
