import { Tdelay, Tdirection, Tduration, Ttype } from "@type/variants";

export const slideIn = (
  direction: Tdirection,
  type: Ttype,
  delay: Tdelay,
  duration: Tduration
) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const textVariant = (delay: Tdelay) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay,
    },
  },
});

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};

export const fadeIn = (
  direction: Tdirection,
  type: Ttype,
  delay: Tdelay,
  duration: Tduration,
  distance: number
) => ({
  hidden: {
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const planetVariants = (direction: Tdirection) => ({
  hidden: {
    x: direction === "left" ? "-100%" : "100%",
    rotate: 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      duration: 1.8,
      delay: 0.5,
    },
  },
});

export const zoomIn = (delay: Tdelay, duration: Tduration) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const scrollTo = {
  top: {
    top: {
      opacity: 0,
    },
    middle: {
      opacity: 1,
    },
  },
  bottom: {
    bottom: {
      opacity: 0,
    },
    middle: {
      opacity: 1,
    },
  },
};

export const randomXFadeIn = {
  off(randomInteger: number) {
    return {
      x: randomInteger * 2,
      opacity: 0,
    };
  },
  on() {
    return {
      x: 0,
      opacity: 1,
    };
  },
};

export const OverlayVariant = {
  on: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: "10",
  },
  off: {
    opacity: 0,
    zIndex: "-1",
  },
};

export const alertVariant = {
  init: {
    opacity: 0,
    scale: 0.5,
  },
  open: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};
