import Link from "next/link";
import { motion } from "framer-motion";
import { chatActions } from "@features/chat/chatSlice";
import { useAppDispatch } from "@toolkit/hook";
import Image from "next/image";

interface IContent {
  title: string;
  link: string;
  content: string;
  img: string;
}

export default function Content({ data }: { data: IContent }) {
  const dispatch = useAppDispatch();

  return (
    <>
      {data.title === "취업 챗봇" ? (
        <div
          onClick={() => dispatch(chatActions.toggleChat())}
          className="h-full w-full"
        >
          <motion.div
            className="flex w-full items-center justify-between gap-8 rounded-2xl bg-main_color/5 p-4 shadow-md md:w-full md:flex-col md:items-start"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.05 },
            }}
            whileTap={{
              scale: 0.9,
              type: "spring",
              transition: { duration: 0.05 },
            }}
          >
            {/* 콘텐츠의 제목과 내용 */}
            <div className="col-start gap-2">
              <span className="text-xl font-bold">{data.title}</span>
              <span className="w-48 sm:w-full md:h-16 lg:h-8">
                {data.content}
              </span>
            </div>

            {/* 콘텐츠 이미지 */}
            <div className="col-end h-full w-full md:items-center md:justify-center">
              <div className="h-28 w-28 md:h-40 md:w-full lg:h-44 lg:w-52">
                <Image
                  src={data.img}
                  alt={data.title}
                  width="500"
                  height="500"
                  className="h-full w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <Link href={`/${data.link}`} className="h-full w-full">
          <motion.div
            className="flex w-full items-center justify-between gap-8 rounded-2xl bg-main_color/5 p-4 shadow-md md:w-full md:flex-col md:items-start"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.05 },
            }}
            whileTap={{
              scale: 0.9,
              type: "spring",
              transition: { duration: 0.05 },
            }}
          >
            {/* 콘텐츠의 제목과 내용 */}
            <div className="col-start gap-2">
              <span className="text-xl font-bold">{data.title}</span>
              <span className="w-48 sm:w-full md:h-16 lg:h-8">
                {data.content}
              </span>
            </div>

            {/* 콘텐츠 이미지 */}
            <div className="col-end h-full w-full md:items-center md:justify-center">
              <div className="h-28 w-28 md:h-40 md:w-full lg:h-44 lg:w-52">
                <Image
                  src={data.img}
                  alt={data.title}
                  width="500"
                  height="500"
                  className="h-full w-full"
                />
              </div>
            </div>
          </motion.div>
        </Link>
      )}
    </>
  );
}
