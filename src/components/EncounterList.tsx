import * as React from 'react';
import {IEncounter, useEncounterContext} from "../contexts/EncounterContext";
import {Table} from "reactstrap";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import {ReactNode} from "react";
import arrayMove from "array-move";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface IItemProps {
  item: IEncounter;
  toggleActive: (encounter: IEncounter) => (e: any) => void;
}

interface IListProps {
  children: ReactNode;
}

const DragHandle = SortableHandle(() => <span className="float-right pr-3"><FontAwesomeIcon icon={faEllipsisV} /></span>);


const SortableItem = SortableElement(({item, toggleActive}: IItemProps) => (
  <tr key={item.id} onClick={toggleActive(item)} className={item.active ? 'bg-primary text-light' : ''}>
    <th>{item.init}</th>
    <td>{item.label}</td>
    <td>{item.hp}</td>
    <td><DragHandle /></td>
  </tr>
));



const SortableList = SortableContainer(({children}: IListProps) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
});


function EncounterList() {
  const { encounterList, editEncounter, setEncounterList } = useEncounterContext();

  const toggleActive = (encounter: IEncounter) => (e: any) => {
    e.stopPropagation();
    editEncounter({...encounter, active: !encounter.active});
    encounterList.forEach(item => {
      if (item.active && item.id !== encounter.id) {
        editEncounter({...item, active: false});
      }
    })
  };
  const handleSortEnd = ({oldIndex, newIndex} : any) => {
    setEncounterList(arrayMove(encounterList, oldIndex, newIndex));
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Ini</th>
          <th>Name</th>
          <th>HP</th>
          <th>Sort</th>
        </tr>
      </thead>
      <SortableList
        useDragHandle
        onSortEnd={handleSortEnd}
      >
        {encounterList
          .map((item, index) => (
            <SortableItem
              item={item}
              key={item.id}
              index={index}
              toggleActive={toggleActive}
            />
          ))}
      </SortableList>
    </Table>
  );
}

export default EncounterList;
