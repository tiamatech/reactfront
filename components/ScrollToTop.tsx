import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePassiveScroll } from "../hooks/usePassiveScroll";

const ScrollToTop: React.FC = () => {
  const { pathname } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  // Update to use window instead of document
  usePassiveScroll(
    typeof window !== 'undefined' ? window : null,
    'scroll',
    handleScroll
  );

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;
  
  return (
    <Fab 
      onClick={handleClick}
      size="small"
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 1000
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTop;
