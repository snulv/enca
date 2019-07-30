import {useEffect, useState} from "react";
import createUseContext from "constate";
import {IMonster} from "../components/NewEncounter/types/monster";

export interface IEncounter extends IBaseEncounter {
  id: number;
}

export interface IBaseEncounter {
  label: string;
  con: boolean;
  active: boolean;
  ac: number;
  hp: number;
  init: number;
  initMod: number;
  perma: boolean;
  monster?: IMonster;
}

export function createNewEncounter(name?: string, init?: number): IBaseEncounter {
  return {
    label: name ? name : '',
    con: false,
    active: false,
    ac: 0,
    hp: 0,
    init: init ? init : 0,
    perma: false,
    initMod: 0,
  }
}

let nextNumber = 1;
function createNextNumber(): number {
  nextNumber = nextNumber + 1;
  return nextNumber - 1;
}

const defaultEncounter: IEncounter[] = [
  {...createNewEncounter('Alice'), id: createNextNumber(), ac: 21, initMod: -1, hp: 0, perma: true },
  {...createNewEncounter('Alvyn'), id: createNextNumber(), ac: 10, initMod: 0, hp: 0, perma: true },
  {...createNewEncounter('Edward'), id: createNextNumber(), ac: 18, initMod: 6, hp: 0, perma: true },
  {...createNewEncounter('Emerald'), id: createNextNumber(), ac: 19, initMod: 0, hp: 0, perma: true },
  {...createNewEncounter('Lewis'), id: createNextNumber(), ac: 16, initMod: 4, hp: 0, perma: true },
];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useEncounter() {
  const encounter = window.localStorage.getItem('encounter');
  const [encounterList, setEncounter] = useState<IEncounter[]>(!!encounter ? JSON.parse(encounter) as IEncounter[] : defaultEncounter);
  useEffect(() => {
    window.localStorage.setItem('encounter', JSON.stringify(encounterList));
  }, [encounterList]);
  const addEncounter = (item: IBaseEncounter) =>
    setEncounter(prevEncounter => [...prevEncounter, {...item, id: createNextNumber() }]);
  const removeEncounter = (id: number) =>
    setEncounter(prevEncounter => prevEncounter.filter(item => item.id !== id));
  const editEncounter = (editedEncounter: IEncounter) => setEncounter(prevEncounter => prevEncounter.map(item => {
    if (item.id === editedEncounter.id) {
      return editedEncounter;
    }
    return item;
  }));
  const clearEncounter = () => {
    setEncounter(defaultEncounter);
  };
  const rollInitiative = () => {
    let mutateList = [...encounterList];
    mutateList = mutateList.map(item => ({
      ...item,
      init: 0,
    }));
    mutateList.forEach(firstItem => {
      if (!firstItem.init) {
        const init = getRandomInt(0, 20) + firstItem.initMod;

        mutateList.forEach(secondItem => {
          if (firstItem.label === secondItem.label) {
            secondItem.init = init;
          }
        })
      }
    });
    setEncounter(mutateList);
  };
  return { encounterList, addEncounter, removeEncounter, editEncounter, clearEncounter, rollInitiative };
}

export const useEncounterContext = createUseContext(useEncounter);
