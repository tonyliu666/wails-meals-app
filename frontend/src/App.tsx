import React, { useState } from "react";
import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import Sidebar from "./components/sidebar";
import { MarkerWithInfowindow } from "./Maps";
import Breakfast from "./components/breakfast";
import { GetRecommendation } from "../wailsjs/go/main/App"; 

const App = () => {
  const [activeMenu, setActiveMenu] = useState<"breakfast" | "lunch" | "dinner" | null>(null); // Track active menu

  const handleSetBreakfast = () => setActiveMenu("breakfast");
  const handleSetLunch = () => setActiveMenu("lunch");
  const handleSetDinner = () => setActiveMenu("dinner");
  
  const handleBreakfastSubmit = (place: string, days: number) => {
    GetRecommendation(place, "breakfast", days).then((strings) => {
      for (let i = 0; i < strings.length; i++) {
        alert(strings[i].name);
      }
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
      <div style={{ flex: 1, padding: "20px" }}>
        <div>
          {/* Render content based on activeMenu */}
          {activeMenu === "breakfast" && <Breakfast onSubmit={handleBreakfastSubmit} />}
          {activeMenu === "lunch" && <p>Lunch menu is active!</p>}
          {activeMenu === "dinner" && <p>Dinner menu is active!</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
