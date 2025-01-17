import React, { useState } from "react";

interface BreakfastProps {
  onSubmit: (place: string, days: number) => void;
}

const Breakfast: React.FC<BreakfastProps> = ({ onSubmit }) => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive integers
    if (/^\d*$/.test(value)) {
      setDays(value);
    }
  };

  const handleSubmit = () => {
    if (place.trim() === "" || days.trim() === "" || parseInt(days) <= 0) {
      alert("Please enter a valid place and a positive number of days.");
      return;
    }

    onSubmit(place, parseInt(days)); // Pass data back to parent
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", width: "300px" }}>
      <h2>Breakfast Planner</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Place:
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter place, eg: HsinChuBigCity"
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Days:
          <input
            type="text"
            value={days}
            onChange={handleDaysChange}
            placeholder="Enter how many days, eg: 7"
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Breakfast;
