import React, { useState } from "react";
import "../Sidebar.css"; // Import your styles

interface SidebarProps {
  setShowMap: (value: boolean) => void;
  setShowBreakfast: () => void;
  setShowLunch: () => void;
  setShowDinner: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setShowMap, setShowBreakfast, setShowLunch, setShowDinner }) => {
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
    { name: "Profile", options: [] },
    { name: "Settings", options: [] },
  ];

  const handleMenuClick = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="sidebar">
      <div className="logo">My App</div>
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
