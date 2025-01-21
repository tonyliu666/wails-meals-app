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
  const [spots, setSpots] = useState<any[]>([]);
  const [changespots, setChangeSpots] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [EatenMeals, setEatenMeals] = useState<"breakfast" | "lunch" | "dinner" | null>(null);

  const handleSetBreakfast = () => {
    setActiveMenu("breakfast");
    setEatenMeals(null); // Disable the EatenMeals section
    setChangeSpots(false);
    setRecorded(false);
  };

  const handleSetLunch = () => {
    setActiveMenu("lunch");
    setEatenMeals(null); // Disable the EatenMeals section
    setChangeSpots(false);
    setRecorded(false);
  };

  const handleSetDinner = () => {
    setActiveMenu("dinner");
    setEatenMeals(null); // Disable the EatenMeals section
    setChangeSpots(false);
    setRecorded(false);
  };

  const handleSetEatenBreakfast = () => {
    setEatenMeals("breakfast");
    setActiveMenu(null); // Disable the activeMenu section
  };

  const handleSetEatenLunch = () => {
    setEatenMeals("lunch");
    setActiveMenu(null); // Disable the activeMenu section
  };

  const handleSetEatenDinner = () => {
    setEatenMeals("dinner");
    setActiveMenu(null); // Disable the activeMenu section
  };

  const handleMealRecommendation = (place: string, days: number, activeMenu: string) => {
    GetRecommendation(place, activeMenu, days).then((spots) => {
      setSpots(spots);
      setChangeSpots((prev) => !prev);
    });
    setRecorded(false);
    setActiveMenu(null);
  };

  const handleEatenMeal = (days: number, eatenMeals: string) => {
    GetDailyMeals(eatenMeals, days).then((meals) => {
      setMeals(meals);
      setRecorded((prev) => !prev);
    });
    setChangeSpots(false);
  };

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
        {/* Show activeMenu content only if EatenMeals is null */}
        {EatenMeals === null && (
          <div>
            {activeMenu === "breakfast" && <Breakfast onSubmit={handleMealRecommendation} activeMenu={activeMenu} />}
            {activeMenu === "lunch" && <p>Lunch menu is active!</p>}
            {activeMenu === "dinner" && <p>Dinner menu is active!</p>}
          </div>
        )}

        {/* Show Google Maps only if EatenMeals is null */}
        {EatenMeals === null && changespots && (
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

        {/* Show EatenMeals content only if activeMenu is null */}
        {activeMenu === null && (
          <div>
            {EatenMeals === "breakfast" && <p>Breakfast you ate is active!</p>}
            {EatenMeals === "lunch" && <p>Lunch you ate is active!</p>}
            {EatenMeals === "dinner" && <MealsRecorder onSubmit={handleEatenMeal} eatenMeals={EatenMeals} />}
          </div>
        )}

        {/* Recorded meals */}
        {activeMenu === null && recorded && (
          <div style={{ color: "#333", marginTop: "20px", padding: "10px" }}>
          <h2 style={{ fontSize: "24px", color: "#007bff", marginBottom: "15px" }}>Meals Recorded</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {meals.map((meal, index) => (
              <div
                key={index}
                style={{
                  width: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <h3 style={{ fontSize: "16px", color: "#007bff", margin: "10px 0" }}>{meal.food_name}</h3>
                <p style={{ fontSize: "14px", color: "#555", margin: "5px 0" }}>
                  Calories: {meal.calories || "N/A"}
                </p>
                <p style={{ fontSize: "14px", color: "#555", margin: "5px 0" }}>
                  Meal Type: {meal.type || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
