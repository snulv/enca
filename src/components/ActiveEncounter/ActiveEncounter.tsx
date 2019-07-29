import * as React from 'react';
import PresentMonster from "../PresentMonster";
import {IEncounter, useEncounterContext} from "../../contexts/EncounterContext";
import {FormGroup, Label, Input, InputGroup, InputGroupAddon, Button} from "reactstrap";
import {default as traits} from './utility/traits.json';
import {default as spells} from './utility/spells.json';
import {IMonster} from "../NewEncounter/types/monster";
import {useState} from "react";
import {usePermaEncounterContext} from "../../contexts/SaveListContext";

interface IProps {
  encounter: IEncounter;
}

function ActiveEncounter({ encounter }: IProps) {
  const { encounterList, addEncounter, editEncounter } = useEncounterContext();

  const [selectedTraits, setTraits] = useState<string[]>([]);
  const [selectedPowers, setPowers] = useState<string[]>([]);
  const [selectedSpells, setSpells] = useState<string[]>([]);

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
    handleUpdateList([...selection, ...selectedPowers, ...selectedSpells]);
  };

  const handlePowers = (event: any) => {
    const selection = handleSelected(event);
    setPowers(selection);
    handleUpdateList([...selectedTraits, ...selection, ...selectedSpells]);

  };

  const handleSpells = (event: any) => {
    const selection = handleSelected(event);
    setSpells(selection);
    handleUpdateList([...selectedTraits, ...selectedPowers, ...selection]);

  };

  const [nameValue, setNameValue] = useState('');
  const {savePermaEncounter} = usePermaEncounterContext();

  const handleInputChange = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleSave = (e: any) => {
    if (nameValue) {
      savePermaEncounter({
        ...encounter,
        label: nameValue,
        active: false,
      });
    }
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
            <Label for="selectSpell">Select Spells</Label>
            <Input type="select" name="selectMultiSpell" id="selectSpell" multiple onChange={handleSpells}>
              { spells
                .map(item => (
                  <option key={item.type} value={`${item.type} Magic: ${item.details}`}>{item.type}</option>
                ))
              }
            </Input>
            <Label for="save">Save</Label>
            <InputGroup>
              <Input id="save" value={nameValue} onChange={handleInputChange}/>
              <InputGroupAddon addonType="append">
                <Button onClick={handleSave} color="success">Save</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </React.Fragment>
      )}
    </div>
  );
}

export default ActiveEncounter;
