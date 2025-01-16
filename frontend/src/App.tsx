import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import { useState } from "react";
import Sidebar from "./components/sidebar";


const App = () => {
  const [showMap, setShowMap] = useState(false);
  // load environment variables
  //const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // const apiKey : string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar setShowMap={setShowMap} />
      <div style={{ flex: 1, padding: "20px" }}>
        {showMap ? (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
             defaultZoom={13}
             defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
             onCameraChanged={ (ev: MapCameraChangedEvent) =>
               console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
             }>
          </Map>
        </APIProvider>
        ) : (
          <div>
            <p>Click "Home" to show the content.</p>
            <p>"API Key: ", {process.env.NODE_ENV}; </p>
            {/* <p>{process.env.REACT_APP_GOOGLE_MAPS_API_KEY}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
