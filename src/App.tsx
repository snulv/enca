import React from 'react';
import './styles/index.scss';
import {useEncounterContext} from "./contexts/EncounterContext";
import ResponsiveView from "./utility/ResponsiveView";
import MobileView from "./components/MobileView/MobileView";
import DesktopView from "./components/DesktopView/DesktopView";
import {usePermaEncounterContext} from "./contexts/SaveListContext";

function App() {
  return (
    <useEncounterContext.Provider>
      <usePermaEncounterContext.Provider>
        <ResponsiveView
          desktopView={<DesktopView />}
          mobileView={<MobileView />}
        />
      </usePermaEncounterContext.Provider>
    </useEncounterContext.Provider>
  );
}

export default App;
