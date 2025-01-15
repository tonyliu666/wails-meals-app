import React from "react";
import "../Sidebar.css"; // Import the CSS file

const Sidebar = ({ setShowMap }: { setShowMap: (value: boolean) => void }) => {
  const menuItems = [
    { name: "Home", action: () => setShowMap(true) },
    { name: "Profile", action: () => alert("Profile clicked!") },
    { name: "Settings", action: () => alert("Settings clicked!") },
  ];

  return (
    <div className="sidebar">
      <div className="logo">My App</div>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="sidebar-button"
          onClick={item.action}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
