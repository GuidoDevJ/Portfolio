import { useEffect, useState, useCallback } from "react";
import { BREAKPOINTS } from "src/constants";

// Window dimensions hook
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

// Mobile menu hook (combines window dimensions with menu state)
export const useWidthAndHeight = () => {
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [active, setActive] = useState(false);

  const width = windowSize[0];

  const ShowList = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (width > BREAKPOINTS.mobile) {
      setActive(false);
    }
  }, [width]);

  return {
    windowSize,
    width,
    active,
    setActive,
    ShowList,
  };
};
