import * as React from 'react';
import {createNewEncounter, IEncounter, useEncounterContext} from "../contexts/EncounterContext";
import {Table} from "reactstrap";
import {useEffect} from "react";

interface IProps {
}

function EncounterList({}: IProps) {
  const { encounterList, addEncounter, editEncounter } = useEncounterContext();
  useEffect(() => {
    addEncounter({...createNewEncounter('Alvyn'), ac: 15, initMod: 3, hp: 50, perma: true });
    addEncounter({...createNewEncounter('Lewis'), ac: 15, initMod: 3, hp: 50, perma: true });
    addEncounter({...createNewEncounter('Emerald'), ac: 15, initMod: 3, hp: 50, perma: true });
    addEncounter({...createNewEncounter('Alice'), ac: 15, initMod: 3, hp: 50, perma: true });
    addEncounter({...createNewEncounter('Edward'), ac: 15, initMod: 3, hp: 50, perma: true });
  }, []);

  const toggleActive = (encounter: IEncounter) => (e: any) => {
    e.stopPropagation();
    editEncounter({...encounter, active: !encounter.active});
    encounterList.forEach(item => {
      if (item.active && item.id !== encounter.id) {
        editEncounter({...item, active: false});
      }
    })
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Ini</th>
          <th>Name</th>
          <th>AC</th>
          <th>HP</th>
        </tr>
      </thead>
      <tbody>
        {encounterList
          .sort((item1, item2) => item2.init - item1.init)
          .map(item => (
          <tr key={item.id} onClick={toggleActive(item)} className={item.active ? 'bg-primary text-light' : ''}>
            <th scope="row">{item.init}</th>
            <td>{item.label}</td>
            <td>{item.ac}</td>
            <td>{item.hp}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EncounterList;
