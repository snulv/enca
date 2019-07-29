import React from 'react';
import {useEncounterContext} from "./contexts/EncounterContext";
import ResponsiveView from "./utility/ResponsiveView";
import MobileView from "./components/MobileView/MobileView";
import DesktopView from "./components/DesktopView/DesktopView";

function App() {
  return (
    <useEncounterContext.Provider>
      <ResponsiveView
        desktopView={<DesktopView />}
        mobileView={<MobileView />}
      />
    </useEncounterContext.Provider>
  );
}

export default App;
