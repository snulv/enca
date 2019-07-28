import * as React from 'react';
import {IMonster} from "./NewEncounter/types/monster";

interface IProps {
  monster: IMonster;
}

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
      <b className="text-danger">Attack dc:</b><span className="float-right">Primary: {monster.spellSave}, Secondary: {monster.spellMod}</span>
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
