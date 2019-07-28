import * as React from 'react';
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

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

  return (
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
  );
}

export default HealthSelector;
