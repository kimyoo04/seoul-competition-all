import { staggerContainer } from "@util/variants/container";
import { motion } from "framer-motion";

export default function StaggerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={` col-center mx-auto`}
    >
      {children}
    </motion.div>
  );
}
