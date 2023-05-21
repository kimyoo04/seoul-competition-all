import { Variants } from "framer-motion";

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};
