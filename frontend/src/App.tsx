import {Marker,AdvancedMarker,InfoWindow, APIProvider, Map, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';
import { useState } from "react";
import Sidebar from "./components/sidebar";


const App = () => {
  const [showMap, setShowMap] = useState(false);
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  // load environment variables
  //const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // const apiKey : string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
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
            <InfoWindow position={{lat: 24.7864938, lng: 121.0188275}} maxWidth={200}>
              <div style={{ color: 'red' }}>
                <p>The diner</p>
              </div>
            </InfoWindow>

            

            {/* <AdvancedMarker
              position={{lat: 24.7864938, lng: 121.2288275}}
              title={'AdvancedMarker with custom html content.'}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: '#1dbe80',
                  border: '2px solid #0e6443',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)'
                }}></div>
            </AdvancedMarker> */}
            <Marker
              position={{lat: 24.7864938, lng: 121.2288275}}
              clickable={true}
              onClick={() => alert('marker was clicked!')}
              title={'clickable google.maps.Marker'}
            />
            
          
             
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
