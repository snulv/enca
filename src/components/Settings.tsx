import * as React from 'react';
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import {usePermaEncounterContext} from "../contexts/SaveListContext";
import {useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEncounterContext} from "../contexts/EncounterContext";

interface IProps {
}

function Settings({}: IProps) {
  const { encounterList, removeEncounter } = useEncounterContext();
  const playerList = encounterList.filter(item => item.perma);
  const [playerItem, setPlayerItem] = useState(0);
  const handleChangePlayerItem = (e: any) => {
    setPlayerItem(Number(e.target.value));
  };
  const handleDeletePlayer = () => {
    if (!playerItem) {
      return;
    }
    removeEncounter(playerItem);
    setPlayerItem(0);
  };


  const {permaEncounterList, removePermaEncounter} = usePermaEncounterContext();
  const [permaItem, setPermaItem] = useState('');
  const handleChangePermaItem = (e: any) => {
    setPermaItem(e.target.value);
  };
  const handleDeletePermaItem = () => {
    if (!permaItem) {
      return;
    }
    removePermaEncounter(permaItem);
    setPermaItem('');
  };

  return (
    <div>
      <FormGroup>
        <Label for="selectPlayer">Remove Player</Label>
        <InputGroup>
          <Input className="pr-5" id="saved" type="select" name="selectPlayer" value={playerItem} onChange={handleChangePlayerItem}>
            <option value="" />
            { playerList.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </Input>
          <InputGroupAddon addonType="append">
            <Button color="danger" onClick={handleDeletePlayer}><FontAwesomeIcon icon={faTrash} /></Button>
          </InputGroupAddon>
        </InputGroup>
        <Label for="selectPermaItem">Remove Premade</Label>
        <InputGroup>
          <Input className="pr-5" id="saved" type="select" name="selectPermaItem" value={permaItem} onChange={handleChangePermaItem}>
            <option value="" />
            { permaEncounterList.map(item => (
              <option key={item.label} value={item.label}>{item.label}</option>
            ))}
          </Input>
          <InputGroupAddon addonType="append">
            <Button color="danger" onClick={handleDeletePermaItem}><FontAwesomeIcon icon={faTrash} /></Button>
          </InputGroupAddon>
        </InputGroup>

        <Label for="save">Save</Label>
        <InputGroup>
          <Input id="save" />
          <InputGroupAddon addonType="append">
            <Button color="success">Save</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </div>
  );
}

export default Settings;
