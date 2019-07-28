import * as React from "react";
import { ReactNode } from "react";

interface IProps {
  readonly children: ReactNode;
  readonly onOutsideClick: (e?: any) => void;
}

class OutsideClick extends React.Component<IProps> {
  public wrapperRef: any;

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  public setWrapperRef = (node: any) => {
    this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  public handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onOutsideClick(event);
    }
  };

  public render() {
    return <span ref={this.setWrapperRef}>{this.props.children}</span>;
  }
}

export default OutsideClick;
