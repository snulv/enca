import * as React from 'react';
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import {usePermaEncounterContext} from "../contexts/SaveListContext";
import {useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createNewEncounter, IBaseEncounter, useEncounterContext} from "../contexts/EncounterContext";

interface IProps {
}

function Settings({}: IProps) {
  const { encounterList, removeEncounter, addEncounter } = useEncounterContext();
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


  const [newPlayerName, setNewPlayerName] = useState('');
  const handleChangePlayerName = (e: any) => {
    setNewPlayerName(e.target.value);
  };
  const [newPlayerInitMod, setNewPlayerInitMod] = useState(0);
  const handleChangePlayerInitMod = (e: any) => {
    setNewPlayerInitMod(Number(e.target.value));
  };

  const [newPlayerAC, setNewPlayerAC] = useState(10);
  const handleChangePlayerAC = (e: any) => {
    setNewPlayerAC(Number(e.target.value));
  };

  const [newPlayerHP, setNewPlayerHP] = useState(0);
  const handleChangePlayerHP = (e: any) => {
    setNewPlayerHP(Number(e.target.value));
  };

  const handleSaveNewPlayer = () => {
    const newPlayer: IBaseEncounter = {
      ...createNewEncounter(newPlayerName),
        ac: newPlayerAC,
        initMod: newPlayerInitMod,
        hp: newPlayerHP,
        perma: true
      };

    addEncounter(newPlayer);
  };

  return (
    <div>
      <FormGroup>
        <h5 className="text-danger">Remove Premade Monster</h5>
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

        <div className="border-bottom border-danger my-3" />

        <h5 className="text-danger">New player</h5>
        <Label for="new-player-name"  className="text-danger">Name</Label>
        <Input id="new-player-name" value={newPlayerName} onChange={handleChangePlayerName}/>

        <Label for="new-player-init"  className="text-danger">Init</Label>
        <Input id="new-player-init" type="number" value={newPlayerInitMod} onChange={handleChangePlayerInitMod}/>

        <Label for="new-player-ac"  className="text-danger">AC</Label>
        <Input id="new-player-ac" type="number" value={newPlayerAC} onChange={handleChangePlayerAC}/>

        <Label for="new-player-hp"  className="text-danger">HP</Label>
        <Input id="new-player-hp" type="number" value={newPlayerHP} onChange={handleChangePlayerHP}/>

        <Button color="success" onClick={handleSaveNewPlayer}>Save</Button>

        <div className="border-bottom border-danger my-3" />

        <h5 className="text-danger">Remove Player</h5>
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


      </FormGroup>
    </div>
  );
}

export default Settings;
