import React, { useState } from "react";
import { APIProvider, Map} from "@vis.gl/react-google-maps";
import Sidebar from "./components/sidebar";
import { MarkerWithInfowindow } from "./components/infowindows";
import Breakfast from "./components/mealplanner";
import { GetDailyMeals, GetRecommendation } from "../wailsjs/go/main/App";
import breakfasticon from "./assets/images/breakfast.png";
import MealsRecorder from "./components/mealrecorder";

const App = () => {
  const [activeMenu, setActiveMenu] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
  const [spots, setSpots] = useState<any[]>([]); // State to store recommended spots
  const [changespots, setChangeSpots] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [EatenMeals, setEatenMeals] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
  const handleSetBreakfast = () => {
    setActiveMenu(null);
    setActiveMenu("breakfast")
    setChangeSpots(false);
    setRecorded(false);
  };
  const handleSetLunch = () => {
    setActiveMenu(null);
    setActiveMenu("lunch")
    setChangeSpots(false);
    setRecorded(false);
  }
  const handleSetDinner = () => {
    setActiveMenu(null);
    setActiveMenu("dinner");
    setChangeSpots(false);
    setRecorded(false);
  }
  const handleSetEatenBreakfast = () => {
    setActiveMenu(null);
    setEatenMeals("breakfast");
  }
  const handleSetEatenLunch = () => {
    setActiveMenu(null);
    setEatenMeals("lunch");
  }
  const handleSetEatenDinner = () => {
    setActiveMenu(null);
    setEatenMeals("dinner");
  }

  const handleMealRecommendation = (place: string, days: number, activeMenu: string) => {
    GetRecommendation(place, activeMenu, days).then((spots) => {
      setSpots(spots); // Save spots to state
      setChangeSpots((prev) => !prev); // Toggle changespots
    });
    if (recorded) {
      setRecorded(false);
    }
    setActiveMenu(null);
  };
  const handleEatenMeal = (days: number, eatenMeals: string) => {
    GetDailyMeals(eatenMeals, days).then((meals) => {
      setMeals(meals); // Save meals to state
      setRecorded((prev) => !prev); // Toggle recorded
    });
    if (changespots) {
      setChangeSpots(false);
    }
    
    setActiveMenu(null); 
  } 

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        setShowBreakfast={handleSetBreakfast}
        setShowLunch={handleSetLunch}
        setShowDinner={handleSetDinner}
        setShowEatenBreakfast={handleSetEatenBreakfast}
        setShowEatenLunch={handleSetEatenLunch}
        setShowEatenDinner={handleSetEatenDinner}
      />
      <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
        { !recorded && 
        <div>
          {/* Render content based on activeMenu */}
          {activeMenu === "breakfast"  && <Breakfast onSubmit={handleMealRecommendation} activeMenu={activeMenu} />}
          {activeMenu === "lunch"  && <p>Lunch menu is active!</p>}
          {activeMenu === "dinner"  && <p>Dinner menu is active!</p>}
        </div>
        }
        {changespots && (
          <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
            <APIProvider
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["marker", "places"]}
            >
              <Map defaultZoom={12} defaultCenter={{ lat: 24.7864938, lng: 121.0188275 }}>
                {spots.map((spot, index) => (
                  <MarkerWithInfowindow
                    key={index}
                    position={spot.location}
                    name={spot.name}
                    rating={spot.rating}
                    icon={breakfasticon}
                  />
                ))}
              </Map>
            </APIProvider>
          </div>
        )}
        {
          !changespots &&
          <div>
          {EatenMeals === "breakfast"  && <p>Breakfast you ate is active!</p>}
          {EatenMeals === "lunch"  && <p>Lunch you ate is active!</p>}
          {EatenMeals === "dinner"  && <MealsRecorder onSubmit={handleEatenMeal} eatenMeals={EatenMeals} /> }
          </div>
        }
        
        {recorded && (
          <div style={{ color: "#333", marginTop: "20px", padding: "10px" }}>
            <h2 style={{ fontSize: "18px", color: "#007bff" }}>Meals Recorded</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "#555" }}>
              {meals.map((meal, index) => (
                <li key={index} style={{ marginBottom: "5px", color: "#007bff" }}>
                  {meal.food_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
