'use client';
import React, { useState } from 'react';
import { Marker, InfoWindow } from '@vis.gl/react-google-maps';
import './maps.css';

interface MarkerWithInfowindowProps {
  position: { lat: number; lng: number };
  name: string;
  rating: number;
  icon: string; 
}

export const MarkerWithInfowindow: React.FC<MarkerWithInfowindowProps> = ({ position, name, rating, icon }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage InfoWindow visibility

  return (
    <>
      <Marker
        position={position}
        onClick={() => setIsOpen(true)} // Show InfoWindow on marker click
        options={{
          icon: {
            url: icon, // Path to the icon
            scaledSize: new google.maps.Size(32, 32), // Resize the icon (width x height in pixels)
          },
        }}
      />
      {isOpen && (
        <InfoWindow
          position={position}
          onCloseClick={() => setIsOpen(false)} // Hide InfoWindow on close click
        >
          <div className="info-window">
            <h2 className="info-title">{name}</h2>
            <p className="info-description">
              Rating: <strong>{rating}</strong>
            </p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
