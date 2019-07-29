import * as React from 'react';
import PresentMonster from "../PresentMonster";
import {IEncounter, useEncounterContext} from "../../contexts/EncounterContext";
import {FormGroup, Label, Input} from "reactstrap";
import {default as traits} from './utility/traits.json';
import {IMonster} from "../NewEncounter/types/monster";
import {useState} from "react";

interface IProps {
  encounter: IEncounter;
}

function ActiveEncounter({ encounter }: IProps) {
  const { encounterList, addEncounter, editEncounter } = useEncounterContext();

  const [selectedTraits, setTraits] = useState<string[]>([]);
  const [selectedPowers, setPowers] = useState<string[]>([]);

  const handleSelected = (event: any): string[] => {
    let opts = [], opt;

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i];

      if (opt.selected) {
        opts.push(opt.value);
      }
    }
    return opts;
  };

  const handleUpdateList = (traits: string[]) => {
    encounterList.forEach(item => {
      if (item.label === encounter.label) {
        editEncounter({
          ...item,
          monster: {
            ...(item.monster as IMonster),
            traits,
          }
        })
      }
    })
  };

  const handleTraits = (event: any) => {
    const selection = handleSelected(event);
    setTraits(selection);
    handleUpdateList([...selection, ...selectedPowers]);
  };

  const handlePowers = (event: any) => {
    const selection = handleSelected(event);
    setPowers(selection);
    handleUpdateList([...selectedTraits, ...selection]);

  };

  return (
    <div>
      {encounter.monster && (
        <React.Fragment>
          <PresentMonster monster={encounter.monster} />
          <FormGroup>
            <Label for="selectTrait">Select Traits</Label>
            <Input type="select" name="selectMultiTrait" id="selectTrait" multiple onChange={handleTraits}>
              { traits
                .filter(item => item.type === 'any')
                .map(item => (
                  <option key={item.trait.split(/:/)[0]} value={item.trait}>{item.trait.split(/:/)[0]}</option>
                ))
              }
            </Input>
            <Label for="selectPower">Select Powers</Label>
            <Input type="select" name="selectMultiPower" id="selectPower" multiple onChange={handlePowers}>
              { traits
                .filter(item => item.type === (encounter.monster as IMonster).type)
                .map(item => (
                  <option key={item.trait.split(/:/)[0]} value={item.trait}>{item.trait.split(/:/)[0]}</option>
                ))
              }
            </Input>
          </FormGroup>
        </React.Fragment>
      )}
    </div>
  );
}

export default ActiveEncounter;
