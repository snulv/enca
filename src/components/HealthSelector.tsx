import * as React from 'react';
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import ResponsiveView from "../utility/ResponsiveView";
import {TouchEventHandler, useState} from "react";

interface IProps {
  value: number;
  onChangeHp: (value: number) => void
}

function HealthSelector({value, onChangeHp}: IProps) {
  const handleChange = (change: number) => () => {
    onChangeHp(value + change);
  };

  const handleInputChange = (e: any) => {
    onChangeHp(Number(e.target.value));
  };

  const handleHalf = () => {
    onChangeHp(Math.floor(value / 2));
  };

  const handleFlip = () => {
    onChangeHp(-value);
  };

  const [currentY, setCurrentY] = useState(0);
  const [startY, setStartY] = useState(0);

  const startTouch = (e: any) => {
    setCurrentY(e.changedTouches[0].screenY);
    setStartY(e.changedTouches[0].screenY);
  };

  const moveTouch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let relevantY = e.changedTouches[0].screenY;
    setCurrentY(relevantY);

    // We do more rapid changes after a certain amount in the same direction
    if (startY - relevantY > 30) {
      // If we have changed direction we reset startY
      if (relevantY - startY > 0) {
        setStartY(e.changedTouches[0].screenY);
      }
      if (currentY - relevantY > 1) {
        onChangeHp(value + 1);
        return;
      }
    }
    if (currentY - relevantY > 3) {
      // If we have changed direction we reset startY
      if (relevantY - startY > 0) {
        setStartY(e.changedTouches[0].screenY);
      }

      onChangeHp(value + 1);
      return;
    }
    // We do more rapid changes after a certain amount in the same direction
    if (startY - relevantY < -30) {
      // If we have changed direction we reset startY
      if (relevantY - startY < 0) {
        setStartY(e.changedTouches[0].screenY);
      }
      if (currentY - relevantY < -1) {
        onChangeHp(value - 1);
        return;
      }
    }
    if (currentY - relevantY < -3) {
      // If we have changed direction we reset startY
      if (relevantY - startY < 0) {
        setStartY(e.changedTouches[0].screenY);
      }

      onChangeHp(value - 1);
    }
  };

  return (
    <ResponsiveView
      desktopView={(
        <div>
          <InputGroup size="lg">
            <InputGroupAddon addonType="prepend">
              <Button size="lg" onClick={handleChange(-1)} color="danger">-</Button>
            </InputGroupAddon>
            <Input type="number" value={value} onChange={handleInputChange}/>
            <InputGroupAddon addonType="append">
              <Button size="lg" onClick={handleChange(1)} color="success">+</Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex justify-content-center">
            <Button size="lg" onClick={handleChange(-10)} color="danger">--</Button>
            <Button size="lg" onClick={handleHalf} color="info">Half</Button>
            <Button size="lg" onClick={handleFlip} color="info">Flip</Button>
            <Button size="lg" onClick={handleChange(10)} color="success">++</Button>
          </div>
        </div>
      )}
      mobileView={(
        <div className="d-flex" style={{ height: '200px'}}>
          <div className="w-100 d-flex flex-column justify-content-center">
            <div className="p-2 text-center border border-success text-success">
              {value > 0 && value}
            </div>
            <div><Input type="number" value={value} onChange={handleInputChange}/></div>
            <div className="p-2 text-center border border-danger text-danger">
              {value < 0 && value}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <div
              className="bg-gradient mx-3 rounded"
              style={{width: '50%', height: '100%'}}
              onTouchStart={startTouch}
              onTouchMove={moveTouch}
            />
          </div>
          <div className="w-100 d-flex flex-column">
            <Button className="m-2" size="sm" onClick={handleHalf} color="info">Half</Button>
            <Button className="m-2" size="sm" onClick={handleFlip} color="info">Flip</Button>
          </div>
        </div>
      )}
    />


  );
}

export default HealthSelector;
