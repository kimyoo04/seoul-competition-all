import { alertActions } from "@features/alert/alertSlice";
import { useAppDispatch } from "@toolkit/hook";
import { motion } from "framer-motion";

export default function Overlay() {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      onClick={() => dispatch(alertActions.alertClose())}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 w-full h-full bg-black/70 "
    ></motion.div>
  );
}
