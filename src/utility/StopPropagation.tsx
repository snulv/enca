import * as React from "react";

interface IProps {
  className?: string;
  children: any;
}

const stop = (e: any) => {
  e.stopPropagation();
};

const StopPropagation = ({ className, children }: IProps) => (
  <span onClick={stop} className={className}>
    {children}
  </span>
);

export default StopPropagation;
