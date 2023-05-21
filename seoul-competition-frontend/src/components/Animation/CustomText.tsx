"use client";

import { textVariant2 } from "@util/variants";
import { textContainer } from "@util/variants/container";
import { motion } from "framer-motion";

export const TypingText = ({
  textData,
  styleClass,
}: {
  textData: string;
  styleClass: string;
}) => (
  <motion.p variants={textContainer} className={styleClass}>
    {Array.from(textData).map((letter: string, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({
  textData,
  styleClass,
}: {
  textData: string;
  styleClass: string;
}) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${styleClass}`}
  >
    {textData}
  </motion.h2>
);
