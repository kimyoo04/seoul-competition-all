import { contents } from "@constants/home/contents";
import ContentItem from "../ContentItem";

export default function Contents() {
  return (
    <div className="col-center w-full gap-10">
      <h2 className="text-2xl font-bold">오늘은 무엇을 하고 싶으신가요?</h2>

      <div className="col-center w-full max-w-7xl gap-4 md:flex-row md:justify-between md:gap-8 lg:gap-12">
        {contents &&
          contents.map((content, index) => (
            <ContentItem key={index + content.title} data={content} />
          ))}
      </div>
    </div>
  );
}
