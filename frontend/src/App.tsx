import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import { useState } from "react";
import Sidebar from "./components/sidebar";


const App = () => {
  const [showMap, setShowMap] = useState(false);
  // load environment variables
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    
  return (
    <div style={{ display: "flex" }}>
      <Sidebar setShowMap={setShowMap} />
      <div style={{ flex: 1, padding: "20px" }}>
        {showMap ? (
        //   <APIProvider apiKey={apiKey}>
        <APIProvider apiKey={apiKey}>
          <Map
             defaultZoom={13}
             defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
             onCameraChanged={ (ev: MapCameraChangedEvent) =>
               console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
             }>
          </Map>
        </APIProvider>
        ) : (
          <p>Click "Home" to show the content.</p>
        )}
      </div>
    </div>
  );
};

export default App;
