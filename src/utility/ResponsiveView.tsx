import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  desktopView: any;
  mobileView: any;
}

function ResponsiveView({
                          desktopView,
                          mobileView,
                        }: IProps) {
  const containerEl = useRef<any>(null);
  const breakPoint = 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  function handleResize() {
    setIsMobile(window.innerWidth < breakPoint);
  }

  useEffect(
    () => {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    [] as ReadonlyArray<any>
  );

  return <div ref={containerEl}>{isMobile ? mobileView : desktopView}</div>;
}

export default ResponsiveView;
