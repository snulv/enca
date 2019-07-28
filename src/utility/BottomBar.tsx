import * as React from 'react';
import {ReactNode} from "react";
import StopPropagation from "./StopPropagation";

interface IProps {
  children: ReactNode;
  onClickOutside?: () => void;
}

function BottomBar({ children, onClickOutside }: IProps) {
  return (
    <div
      className="position-fixed"
      style={{ top: '0', left: '0', width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.3)', zIndex: 1040 }}
      onClick={onClickOutside}
    >
      <StopPropagation>
        <div className="position-fixed bg-light p-3" style={{width: '100vw', height: '175px', bottom: '0', left: '0'}}>
          {children}
        </div>
      </StopPropagation>
    </div>
  );
}

export default BottomBar;
