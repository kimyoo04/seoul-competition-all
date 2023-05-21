import { chatActions } from "@features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ChatAlert() {
  const dispatch = useAppDispatch();
  const alertMsg = useAppSelector((state) => state.chat.alertMsg);

  // 3초 뒤 알람 비활성화
  useEffect(() => {
    const hideChatAlert = setTimeout(() => {
      dispatch(chatActions.hideAlert());
    }, 3000);

    return () => {
      clearTimeout(hideChatAlert);
    };
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      id={"chat-alert"}
      key={"chat-alert"}
      className="col-center absolute top-12 h-16 w-full px-3 py-2"
    >
      <div className="col-center h-12 w-full cursor-pointer rounded-md bg-sub_color shadow-md">
        <span>{alertMsg}</span>
      </div>
    </motion.div>
  );
}
