import * as React from 'react';
import {useState} from "react";
import {default as monstersByLevel} from './utility/monsterByLevel.json';
import {default as monstersByRole} from './utility/monsterByRole.json';
import {default as monstersByRank} from './utility/monsterByRank.json';
import getMonsterByLevel from "./utility/getMonsterByLevel";
import {IMonster} from "./types/monster";
import {Button, Input, Label} from "reactstrap";
import {IRole} from "./types/role";
import modifyMonsterByRole from "./utility/modifyMonsterByRole";
import {IRank} from "./types/rank";
import modifyMonsterByRank from "./utility/modifyMonsterByRank";
import {createNewEncounter, useEncounterContext} from "../../contexts/EncounterContext";

interface IProps {
}

function NewEncounter({}: IProps) {
  const { addEncounter } = useEncounterContext();
  const [level, setLevel] = useState<string>("-3");
  const [role, setRole] = useState<string>('Controller');
  const [rank, setRank] = useState<string>('Standard');


  const handleChangeLevel = (e: any) => {
    setLevel(e.target.value);
  };

  const handleChangeRole = (e: any) => {
    setRole(e.target.value);
  };

  const handleChangeRank = (e: any) => {
    setRank(e.target.value);
  };

  const handleAddMonster = () => {
    let monster = getMonsterByLevel(level);
    monster = modifyMonsterByRole(monster, role);
    monster = modifyMonsterByRank(monster, rank);
    addEncounter({
      ...createNewEncounter(`${monster.rank} ${monster.type} ${monster.level}`),
      initMod: Number(monster.init),
      ac: Number(monster.ac),
      hp: Number(monster.hp),
      monster,
    })
  };



  return (
    <div className="position-fixed bg-light p-3" style={{width: '100vw', height: '175px', bottom: '0', left: '0'}}>
      <div className="d-flex flex-row">
        <div style={{flexBasis: "33%"}}>
          <Label htmlFor="level">Level</Label>
          <Input id="level" type="select" name="selectLevel" value={level} onChange={handleChangeLevel}>
            { (monstersByLevel as IMonster[]).map(item => (
              <option value={item.level}>{item.level}</option>
            ))}
          </Input>
        </div>
        <div style={{flexBasis: "33%"}}>
          <Label htmlFor="role">Role</Label>
          <Input id="role" type="select" name="selectLevel" value={role} onChange={handleChangeRole}>
            { (monstersByRole as IRole[]).map(item => (
              <option value={item.type}>{item.type}</option>
            ))}
          </Input>
        </div>
        <div style={{flexBasis: "33%"}}>
          <Label htmlFor="rank">Rank</Label>
          <Input id="rank" type="select" name="selectLevel" value={rank} onChange={handleChangeRank}>
            { (monstersByRank as IRank[]).map(item => (
              <option value={item.type}>{item.type}</option>
            ))}
          </Input>
        </div>
      </div>
      <Button onClick={handleAddMonster} color="success" size="lg" className="rounded-circle position-fixed" style={{bottom: '15px', right: '15px'}}>
        +
      </Button>
    </div>
  );
}

export default NewEncounter;
