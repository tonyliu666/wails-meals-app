import React, { useState } from "react";
import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import Sidebar from "./components/sidebar";
import { MarkerWithInfowindow } from "./Maps";

const App = () => {
  const [showMap, setShowMap] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"breakfast" | "lunch" | "dinner" | null>(null); // Track active menu

  const handleSetBreakfast = () => setActiveMenu("breakfast");
  const handleSetLunch = () => setActiveMenu("lunch");
  const handleSetDinner = () => setActiveMenu("dinner");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        setShowMap={setShowMap}
        setShowBreakfast={handleSetBreakfast}
        setShowLunch={handleSetLunch}
        setShowDinner={handleSetDinner}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        {showMap ? (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["marker", "places"]}>
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: 24.7864938, lng: 121.0188275 }}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
              }
            >
              <MarkerWithInfowindow />
            </Map>
          </APIProvider>
        ) : (
          <div>
            <p>Click "Home" to show the content.</p>
          </div>
        )}
        <div>
          {/* Render content based on activeMenu */}
          {activeMenu === "breakfast" && <p>Breakfast menu is active!</p>}
          {activeMenu === "lunch" && <p>Lunch menu is active!</p>}
          {activeMenu === "dinner" && <p>Dinner menu is active!</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
