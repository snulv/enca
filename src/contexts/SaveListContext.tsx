import { useState } from "react";
import createUseContext from "constate";
import {IBaseEncounter} from "./EncounterContext";

function usePermaEncounter() {
  const permaEncounter = window.localStorage.getItem('permaEncounter');
  const [permaEncounterList, setPermaEncounter] = useState<IBaseEncounter[]>(!!permaEncounter ? JSON.parse(permaEncounter) as IBaseEncounter[] : []);
  const savePermaEncounter = (item: IBaseEncounter) => {
    setPermaEncounter(prevPermaEncounter => {
      let newList = [...prevPermaEncounter, {...item, item }];
      const findOld = prevPermaEncounter.find(old => old.label === item.label);
      if (findOld) {
        newList = prevPermaEncounter.map(old => {
          if (old.label === item.label) {
            return item;
          }
          return old;
        })
      }
      window.localStorage.setItem('permaEncounter', JSON.stringify(newList));
      return newList;
    });

  };

  return { permaEncounterList, savePermaEncounter };
}

export const usePermaEncounterContext = createUseContext(usePermaEncounter);
