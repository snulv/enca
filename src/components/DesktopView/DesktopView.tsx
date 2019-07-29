import * as React from 'react';
import EncounterList from "../EncounterList";
import ActiveEncounter from "../ActiveEncounter/ActiveEncounter";
import NewEncounter from "../NewEncounter/NewEncounter";
import HealthSelector from "../HealthSelector";
import {useEffect} from "react";
import {IEncounter, useEncounterContext} from "../../contexts/EncounterContext";
import {useState} from "react";
import {Button, ButtonGroup} from "reactstrap";

interface IProps {
}

function DesktopView({}: IProps) {
  const { encounterList, clearEncounter, rollInitiative } = useEncounterContext();
  const [ damageMod, setDamageMod ] = useState(10);


  const handleClearList = () => {
    clearEncounter();
  };

  const handleRoll = () => {
    rollInitiative();
  };

  const handleHealthSelection = (value: number) => {
    setDamageMod(value);
  };


  useEffect(() => {
    encounterList.forEach(item => {
      if (item.active /*&& holdingDownButton*/) {
        // Update hp status
      }
    })
  }, [encounterList]);

  const activeItem = encounterList.find(item => item.active);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6">
          <NewEncounter />
        </div>
        <div className="col col-md-2">
          <ButtonGroup className="d-flex">
            <Button className="w-100" onClick={handleRoll} color="info" size="sm">
              Roll
            </Button>
            <Button className="w-100" onClick={handleClearList} color="danger" size="sm">
              Clear
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-8">
          <EncounterList />
        </div>
        <div className="col col-md-4">
          {activeItem && <ActiveEncounter encounter={activeItem}/>}
        </div>
      </div>
      <div className="row">
        <div className="col col-md-8">
          <HealthSelector value={damageMod} onChangeHp={handleHealthSelection} />
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
