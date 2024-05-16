"use client";

import { useState, useEffect } from "react";

const useViewport = () => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  // console.log(width);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize); // Cleanup function to remove event listener

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return { width, height };
};

export default useViewport;
