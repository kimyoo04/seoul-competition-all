import ContentLoader from "react-content-loader";

export default function EducationListLoader() {
  // contenr Loader data 15개
  const contentLoaderArr = Array.from(Array(15).keys());

  return (
    <ul className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {contentLoaderArr.map((_, index) => (
        <li
          key={index + "dummy" + "education"}
          className="flex w-full flex-col gap-4  rounded-2xl bg-white py-4 pl-4 shadow-md"
        >
          {/* 교육 이름 */}
          <div className="w-full pr-4">
            <ContentLoader
              uniqueKey="education-name"
              width={"100%"}
              height={32}
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          </div>

          {/* 교육 정보 */}
          <div className="flex justify-between gap-4">
            <div className="row-center gap-2">
              <div>
                <ContentLoader
                  uniqueKey="education-people"
                  width={100}
                  height={32}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>
              </div>

              <div>
                <ContentLoader
                  uniqueKey="education-price"
                  width={100}
                  height={32}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>
              </div>
            </div>

            <div>
              <ContentLoader
                uniqueKey="education-status"
                width={100}
                height={32}
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
              </ContentLoader>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
