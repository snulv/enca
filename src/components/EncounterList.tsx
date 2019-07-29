import * as React from 'react';
import {createNewEncounter, IEncounter, useEncounterContext} from "../contexts/EncounterContext";
import {Table} from "reactstrap";
import {useEffect} from "react";

interface IProps {
}

function EncounterList({}: IProps) {
  const { encounterList, addEncounter, editEncounter } = useEncounterContext();
  useEffect(() => {
    addEncounter({...createNewEncounter('Alice'), ac: 21, initMod: -1, hp: 0, perma: true });
    addEncounter({...createNewEncounter('Alvyn'), ac: 10, initMod: 0, hp: 0, perma: true });
    addEncounter({...createNewEncounter('Edward'), ac: 18, initMod: 6, hp: 0, perma: true });
    addEncounter({...createNewEncounter('Emerald'), ac: 19, initMod: 0, hp: 0, perma: true });
    addEncounter({...createNewEncounter('Lewis'), ac: 16, initMod: 4, hp: 0, perma: true });
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
