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
  const [lastChange, setLastChange] = useState(0);


  const startTouch = (e: any) => {
    setLastChange(Date.now());

  };

  const moveTouch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let relevantY = e.changedTouches[0].screenY;
    setCurrentY(relevantY);

    if (currentY - relevantY > 5) {
      const now = Date.now();
      setLastChange(now);
      if (now - lastChange < 30) {
        onChangeHp(value + 3);
        return;
      }
      onChangeHp(value + 1);
      return;
    }
    if (currentY - relevantY < -4) {
      const now = Date.now();
      setLastChange(now);
      if (now - lastChange < 30) {
        onChangeHp(value - 3);
        return;
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
            <div role="button" onClick={handleChange(1)} className="p-2 text-center border border-success text-success">
              +{value > 0 && value}
            </div>
            <div><Input type="number" value={value} onChange={handleInputChange}/></div>
            <div role="button" onClick={handleChange(-1)} className="p-2 text-center border border-danger text-danger">
              {value < 0 ? value : '-'}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <div
              className="bg-gradient mx-3 rounded no-touch"
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
