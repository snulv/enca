import * as React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import NewEncounter from "../NewEncounter/NewEncounter";
import BottomBar from "../../utility/BottomBar";
import ActiveEncounter from "../ActiveEncounter/ActiveEncounter";
import EncounterList from "../EncounterList";
import {useEffect, useState} from "react";
import {useEncounterContext} from "../../contexts/EncounterContext";
import Sidebar from "../../utility/Sidebar";
import HealthSelector from "../HealthSelector";

interface IProps {
}

function MobileView({}: IProps) {
  const { encounterList, clearEncounter, rollInitiative, editEncounter } = useEncounterContext();
  const [bottomBarView, setBottomBarView] = useState('');
  const [ damageMod, setDamageMod ] = useState(10);

  const handleChangeView = (view: string) => () => {
    setBottomBarView(view);
  };

  const handleClearList = () => {
    clearEncounter();
  };

  const handleRoll = () => {
    rollInitiative();
  };

  const handleHealthSelection = (value: number) => {
    setDamageMod(value);
  };

  const activeItem = bottomBarView !== 'deal' ? encounterList.find(item => item.active) : undefined;

  const handleOutSideSidebarClick = () => {
    if (!activeItem) {
      return;
    }
    editEncounter({ ...activeItem, active: false });
  };

  useEffect(() => {
    if (bottomBarView === 'deal') {
      encounterList.forEach(item => {
        if (item.active) {
          editEncounter({
            ...item,
            active: false,
            hp: item.hp + damageMod
          });
        }
      })
    }
  }, [encounterList]);




  return (
    <React.Fragment>
      <div className="pb-5">
        <EncounterList />
      </div>
      { activeItem && (
        <Sidebar onClickOutside={handleOutSideSidebarClick}>
          <ActiveEncounter encounter={activeItem}/>
        </Sidebar>
      ) }
      {bottomBarView === 'new' && (
        <BottomBar onClickOutside={handleChangeView('')}>
          <NewEncounter />
        </BottomBar>
      )}
      {bottomBarView === 'deal' && (
        <div className="position-fixed bg-light p-3" style={{width: '100vw', height: '175px', bottom: '0', left: '0', zIndex: 1040}}>
          <div className="d-flex justify-content-center">
            <HealthSelector value={damageMod} onChangeHp={handleHealthSelection} />
          </div>
          <Button onClick={handleChangeView('')} color="danger" size="lg" className="rounded-circle position-fixed" style={{bottom: '15px', right: '15px'}}>
            X
          </Button>
        </div>
      )}
      <div className="fixed-bottom">
        <ButtonGroup className="d-flex">
          <Button className="w-100 c-mobile-nav__item" onClick={handleRoll} color="info" size="lg">
            Roll
          </Button>
          <Button className="w-100 c-mobile-nav__item" onClick={handleClearList} color="danger" size="lg">
            Clear
          </Button>
          <Button className="w-100 c-mobile-nav__item" onClick={handleChangeView('deal')} color="warning" size="lg">
            Deal
          </Button>
          <Button className="w-100 c-mobile-nav__item" onClick={handleChangeView('new')} color="success" size="lg">
            New
          </Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
}

export default MobileView;
