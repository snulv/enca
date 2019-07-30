import * as React from 'react';
import {IMonster} from "./NewEncounter/types/monster";

interface IProps {
  monster: IMonster;
}

const calculateMultiAttacks = (dmg: number): string => {
  if (dmg <= 10) {
    return `${dmg} x1`;
  }
  if (dmg <= 30) {
    return `${Math.floor(dmg/2)} x2`;
  }
  if (dmg <= 60) {
    return `${Math.floor(dmg/3)} x3`;
  }
  if (dmg <= 100) {
    return `${Math.floor(dmg/4)} x4`;
  }
  return `${Math.floor(dmg/5)} x5`;
};

const PresentMonster = ({monster}: IProps) => (
  <div className="my-3">
    <h4 className="text-danger">{monster.rank} {monster.type} {monster.level}</h4>
    <div className="border-bottom border-danger my-2" />
    <div className="d-flex flex-row align-items-stretch">
      <div style={{flexBasis: "50%"}} className="pr-3">
        <div>
          <b className="text-danger">AC:</b><span className="float-right">{monster.ac}</span>
        </div>
        <div>
          <b className="text-danger">HP:</b><span className="float-right">{monster.hp}</span>
        </div>
        <div>
          <b className="text-danger">Speed:</b><span className="float-right">{monster.speed}</span>
        </div>
      </div>
      <div style={{flexBasis: "50%"}} className="pl-3">
        <div>
          <b className="text-danger">Perception:</b><span className="float-right">{monster.perception}</span>
        </div>
        <div>
          <b className="text-danger">Stealth:</b><span className="float-right">{monster.stealth}</span>
        </div>
        <div>
          <b className="text-danger">Init:</b><span className="float-right">{monster.init}</span>
        </div>
      </div>
    </div>
    <div>
      <b className="text-danger">Saving throws:</b><span className="float-right">{monster.save1}, {monster.save2}, {monster.save3}</span>
    </div>
    <div className="border-bottom border-danger my-2" />
    <div>
      <b className="text-danger">Attacks:</b><span className="float-right">Hit: {monster.attack}, Dmg: {monster.damage}</span>
    </div>
    <div>
      <b className="text-danger">Attack DC:</b><span className="float-right">Primary: {monster.spellSave}, Secondary: {monster.spellMod}</span>
    </div>
    <div>
      <b className="text-danger">Multi attack:</b><span className="float-right">{calculateMultiAttacks(Number(monster.damage))}</span>
    </div>
    <div>
      <b className="text-danger">Condition:</b><span className="float-right">Once per turn</span>
    </div>
    <div>
      <b className="text-danger">Area of effect:</b><span className="float-right">Half: {Math.floor(Number(monster.damage) * 0.5)}, None: {Math.floor(Number(monster.damage) * 0.75)}</span>
    </div>
    <div>
      <b className="text-danger">Movement:</b><span className="float-right">Push, Pull, Slide, Direct</span>
    </div>
    <div>
      <b className="text-danger">Uncommon:</b><span className="float-right">Effect x2</span>
    </div>
    <div>
      <b className="text-danger">Rare:</b><span className="float-right">Effect x3</span>
    </div>
    <div>
      <b className="text-danger">Overkill:</b><span className="float-right">Effect x4</span>
    </div>
    <div className="border-bottom border-danger my-2" />
    <div>
      <h5 className="text-danger">Paragon</h5>
      {monster.paragon.map(item => (
        <div>
          <b className="text-danger">{item.split(/:/)[0]}</b>
          <p>{item.split(/:/)[1]}</p>
        </div>
      ))}
    </div>
    <div>
      <h5 className="text-danger">Traits</h5>
      {monster.traits.map(item => (
        <div>
          <b className="text-danger">{item.split(/:/)[0]}</b>
          <p>{item.split(/:/)[1]}</p>
        </div>
      ))}
    </div>
  </div>
);

export default PresentMonster;
