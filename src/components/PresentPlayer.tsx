import * as React from 'react';
import {IEncounter} from "../contexts/EncounterContext";

interface IProps {
  encounter: IEncounter;
}

const PresentPlayer = ({encounter}: IProps) => (
  <div className="my-3">
    <h4 className="text-danger">{encounter.label}</h4>
    <div className="border-bottom border-danger my-2" />
    <div className="d-flex flex-row align-items-stretch">
      <div style={{flexBasis: "50%"}} className="pr-3">
        <div>
          <b className="text-danger">AC:</b><span className="float-right">{encounter.ac}</span>
        </div>
        <div>
          <b className="text-danger">HP:</b><span className="float-right">{encounter.hp} ({(Number(encounter.hp)/2).toFixed(0)})</span>
        </div>
        <div>
          <b className="text-danger">Init:</b><span className="float-right">{encounter.initMod}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PresentPlayer;
