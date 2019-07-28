import React from 'react';
import {useEncounterContext} from "./contexts/EncounterContext";
import ResponsiveView from "./utility/ResponsiveView";
import MobileView from "./components/MobileView/MobileView";

function App() {
  return (
    <useEncounterContext.Provider>
      <ResponsiveView desktopView={(
        <div>Still in creation mode</div>
      )} mobileView={<MobileView />}/>

    </useEncounterContext.Provider>
  );
}

export default App;
