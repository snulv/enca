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
import ResponsiveView from "../../utility/ResponsiveView";
import {usePermaEncounterContext} from "../../contexts/SaveListContext";

interface IProps {
}

function NewEncounter({}: IProps) {
  const { encounterList, addEncounter } = useEncounterContext();
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

  const {permaEncounterList} = usePermaEncounterContext();
  const [permaItem, setPermaItem] = useState<''>('');
  const handleChangePermaItem = (e: any) => {
    setPermaItem(e.target.value);
  };

  const handleAddMonster = () => {
    if (permaItem) {
      const encounter = permaEncounterList.find(item => item.label === permaItem);
      if (encounter) {
        addEncounter(encounter);
        return;
      }
    }

    let monster = getMonsterByLevel(level);
    monster = modifyMonsterByRole(monster, role);
    monster = modifyMonsterByRank(monster, rank, encounterList.filter(item => item.perma).length);
    addEncounter({
      ...createNewEncounter(`${monster.rank} ${monster.type} ${monster.level}`),
      initMod: Number(monster.init),
      ac: Number(monster.ac),
      hp: Number(monster.hp),
      monster,
    })
  };



  return (
    <ResponsiveView
      desktopView={
        <div>
          <div className="d-flex flex-row">
            <div style={{flexBasis: "30%"}}>
              <Input id="level" type="select" bsSize="sm" name="selectLevel" value={level} onChange={handleChangeLevel}>
                { (monstersByLevel as IMonster[]).map(item => (
                  <option key={item.level} value={item.level}>{item.level}</option>
                ))}
              </Input>
            </div>
            <div style={{flexBasis: "30%"}}>
              <Input id="role" type="select" bsSize="sm" name="selectLevel" value={role} onChange={handleChangeRole}>
                { (monstersByRole as IRole[]).map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </Input>
            </div>
            <div style={{flexBasis: "30%"}}>
              <Input id="rank" type="select" bsSize="sm" name="selectLevel" value={rank} onChange={handleChangeRank}>
                { (monstersByRank as IRank[]).map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </Input>
            </div>
            <div style={{flexBasis: "10%"}}>
              <Button onClick={handleAddMonster} color="success" size="sm">
                +
              </Button>
            </div>
          </div>
        </div>
      }
      mobileView={(
        <div className="position-fixed bg-light p-3" style={{width: '100vw', height: '175px', bottom: '0', left: '0'}}>
          <div className="d-flex flex-row">
            <div style={{flexBasis: "33%"}}>
              <Label htmlFor="level">Level</Label>
              <Input id="level" type="select" name="selectLevel" value={level} onChange={handleChangeLevel}>
                { monstersByLevel.map(item => (
                  <option key={item.level} value={item.level}>{item.level}</option>
                ))}
              </Input>
            </div>
            <div style={{flexBasis: "33%"}}>
              <Label htmlFor="role">Role</Label>
              <Input id="role" type="select" name="selectLevel" value={role} onChange={handleChangeRole}>
                { (monstersByRole as IRole[]).map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </Input>
            </div>
            <div style={{flexBasis: "33%"}}>
              <Label htmlFor="rank">Rank</Label>
              <Input id="rank" type="select" name="selectLevel" value={rank} onChange={handleChangeRank}>
                { (monstersByRank as IRank[]).map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </Input>
            </div>
          </div>
          <div className="pr-5">
            <div className="pr-5">
              <div className="pr-5">
                <Label htmlFor="saved">Saved</Label>
                <Input className="pr-5" id="saved" type="select" name="selectLevel" value={permaItem} onChange={handleChangePermaItem}>
                  <option value="" />
                  { permaEncounterList.map(item => (
                    <option key={item.label} value={item.label}>{item.label}</option>
                  ))}
                </Input>
              </div>
            </div>
          </div>
          <Button onClick={handleAddMonster} color="success" size="lg" className="rounded-circle position-fixed" style={{bottom: '15px', right: '15px'}}>
            +
          </Button>
        </div>
      )}
    />

  );
}

export default NewEncounter;
