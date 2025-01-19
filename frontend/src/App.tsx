import React, { useState } from "react";
import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import Sidebar from "./components/sidebar";
import { MarkerWithInfowindow } from "./components/infowindows";
import Breakfast from "./components/breakfast";
import { GetRecommendation } from "../wailsjs/go/main/App";

const App = () => {
  const [activeMenu, setActiveMenu] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
  const [spots, setSpots] = useState<any[]>([]); // State to store recommended spots
  const [changespots, setChangeSpots] = useState(false);

  const handleSetBreakfast = () => {
    setActiveMenu("breakfast")
    setChangeSpots(false);
  };
  const handleSetLunch = () => setActiveMenu("lunch");
  const handleSetDinner = () => setActiveMenu("dinner");

  const handleBreakfastSubmit = (place: string, days: number) => {
    GetRecommendation(place, "breakfast", days).then((spots) => {
      setSpots(spots); // Save spots to state
      setChangeSpots((prev) => !prev); // Toggle changespots
    });
    setActiveMenu(null); // Close the menu after submission
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        setShowBreakfast={handleSetBreakfast}
        setShowLunch={handleSetLunch}
        setShowDinner={handleSetDinner}
      />
      <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
        <div>
          {/* Render content based on activeMenu */}
          {activeMenu === "breakfast" && <Breakfast onSubmit={handleBreakfastSubmit} />}
          {activeMenu === "lunch" && <p>Lunch menu is active!</p>}
          {activeMenu === "dinner" && <p>Dinner menu is active!</p>}
        </div>
        
        {changespots && (
          <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
            <APIProvider
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["marker", "places"]}
            >
              <Map
                key={changespots} // Force re-render on changespots change
                defaultZoom={25}
                defaultCenter={{ lat: 24.7864938, lng: 121.0188275 }}
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                  console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                }
              >
                {spots.map((spot, index) => (
                  <MarkerWithInfowindow
                    key={index}
                    position={{ lat: spot.location.lat, lng: spot.location.lng }}
                    infoContent={spot.name}
                  />
                ))}
              </Map>
            </APIProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
