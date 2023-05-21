import { motion } from "framer-motion";
import { useAppSelector } from "@toolkit/hook";

import Header from "./Header";
import Alert from "@components/Alert";
import Chat from "@components/Chat";
import ChatButton from "@components/Chat/ChatButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlert = useAppSelector((state) => state.alert.isAlert);
  return (
    <>
      {/* 메인 영역 */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="col-center container mx-auto px-4 pt-20">
          {children}
        </div>
      </motion.main>

      {/* 해더 영역 */}
      <Header />

      {/* Alert */}
      {isAlert && <Alert />}

      {/* 채팅창 */}
      <Chat />
      <ChatButton />
    </>
  );
}
