import { useEffect, useState } from "react";

const useWidthAndHeight = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [active, setActive] = useState(false);

  const width = windowSize[0];
  const ShowList = () => {
    if (active) setActive(false);
    if (!active) setActive(true);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    if (width > 600) setActive(false);
  }, [width]);
  return {
    windowSize,
    width,
    active,
    setActive,
    ShowList,
  };
};

export { useWidthAndHeight };
