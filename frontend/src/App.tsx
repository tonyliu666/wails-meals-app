import {APIProvider, Map, MapCameraChangedEvent, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { useState } from "react";
import Sidebar from "./components/sidebar";
import { MarkerWithInfowindow } from './Maps';


const App = () => {
  const [showMap, setShowMap] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowOpen, setInfowindowOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setShowMap={setShowMap} />
      <div style={{ flex: 1, padding: "20px" }}>
        {showMap ? (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['marker', 'places']}>
          
            <Map
              defaultZoom={13}
              defaultCenter={ { lat: 24.7864938, lng: 121.0188275 } }
              onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }>
              
              <MarkerWithInfowindow />             
            </Map>
          
        </APIProvider>
        ) : (
          <div>
            <p>Click "Home" to show the content.</p>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default App;
