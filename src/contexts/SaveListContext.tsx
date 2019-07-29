import { useState } from "react";
import createUseContext from "constate";
import {IBaseEncounter} from "./EncounterContext";

function usePermaEncounter() {
  const permaEncounter = window.localStorage.getItem('permaEncounter');
  const [permaEncounterList, setPermaEncounter] = useState<IBaseEncounter[]>(!!permaEncounter ? JSON.parse(permaEncounter) as IBaseEncounter[] : []);
  const addPermaEncounter = (item: IBaseEncounter) => {
    setPermaEncounter(prevPermaEncounter => {
      const newList = [...prevPermaEncounter, {...item, item }];
      window.localStorage.setItem('permaEncounter', JSON.stringify(newList));
      return newList;
    });

  };

  return { permaEncounterList, addPermaEncounter };
}

export const usePermaEncounterContext = createUseContext(usePermaEncounter);
