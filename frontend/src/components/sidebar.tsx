import React, { useState } from "react";
import "./Sidebar.css"; // Import your styles

interface SidebarProps {

  setShowBreakfast: () => void;
  setShowLunch: () => void;
  setShowDinner: () => void;
  setShowEatenBreakfast: () => void;
  setShowEatenLunch: () => void;
  setShowEatenDinner: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setShowBreakfast, setShowLunch, setShowDinner, setShowEatenBreakfast,setShowEatenLunch, setShowEatenDinner}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      name: "ShopRecommendation",
      options: [
        { name: "Breakfast", action: setShowBreakfast },
        { name: "Lunch", action: setShowLunch },
        { name: "Dinner", action: setShowDinner },
      ],
    },
    { name: "Profile", options: [
        { name: "Breakfast You Ate", action: setShowEatenBreakfast },
        { name: "Lunch You Ate", action: setShowEatenLunch },
        { name: "Dinner You Ate", action: setShowEatenDinner },
    ] },
    { name: "Settings", options: [] },
  ];

  const handleMenuClick = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="sidebar">
      <div className="logo">RecordYourMeals</div>
      {menuItems.map((item, index) => (
        <div key={index} className="sidebar-item">
          <button className="sidebar-button" onClick={() => handleMenuClick(item.name)}>
            {item.name}
          </button>
          {activeMenu === item.name && item.options && (
            <div className="dropdown">
              {item.options.map((option, idx) => (
                <button
                  key={idx}
                  className="dropdown-item"
                  onClick={() => {
                    option.action(); // Call the action associated with the option
                    setActiveMenu(null); // Close the dropdown after selection
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
