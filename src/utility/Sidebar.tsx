import * as React from 'react';
import {ReactNode} from "react";
import StopPropagation from "./StopPropagation";

interface IProps {
  onClickOutside?: () => void;
  leftSide?:boolean;
  children: ReactNode;
}

function Sidebar({ children, leftSide, onClickOutside }: IProps) {
  return (
    <div
      className="position-fixed"
      style={{ top: '0', left: leftSide ? 'auto' : '0', right: leftSide ? '0' : 'auto', width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.3)', zIndex: 1040}}
      onClick={onClickOutside}
    >
      <StopPropagation>
        <div className="position-fixed bg-light p-2 pb-5 overflow-auto" style={{ top: '0', right: leftSide ? 'auto' : '0', left: leftSide ? '0' : 'auto', width: '75vw', height: '100vh' }}>
          <div className="pb-5">
            {children}
          </div>
        </div>
      </StopPropagation>
    </div>
  );
}

export default Sidebar;
