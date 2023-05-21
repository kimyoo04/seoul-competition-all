import ContentLoader from "react-content-loader";

export default function PostListLoader() {
  const contentLoaderArr = Array.from(Array(15).keys());

  return (
    <ul className="grid w-full grid-cols-1 gap-4">
      {contentLoaderArr.map((_, index) => (
        <li
          key={index + "dummy" + "posts"}
          className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md"
        >
          {/* 작성자명과 작성일자 */}
          <div className="flex items-center justify-between">
            <ContentLoader uniqueKey="post-nickname" width={100} height={26}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          </div>

          {/* 제목과 내용 */}
          <div className="col-start gap-2">
            <ContentLoader uniqueKey="post-title" width={200} height={34}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
            <ContentLoader uniqueKey="post-content" width={450} height={26}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          </div>

          {/* 조회와 댓글 */}
          <div className="mt-4 flex justify-between">
            <div className="row-center gap-2">
              <ContentLoader uniqueKey="post-hits" width={60} height={26}>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
              </ContentLoader>
              <ContentLoader uniqueKey="post-comments" width={60} height={26}>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
              </ContentLoader>
            </div>
            <ContentLoader uniqueKey="post-date" width={60} height={26}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          </div>
        </li>
      ))}
    </ul>
  );
}
