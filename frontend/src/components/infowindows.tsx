'use client';
import React from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import './maps.css'; // Import the CSS file

interface MarkerWithInfowindowProps {
  position: { lat: number; lng: number };
  infoContent: string;
}

export const MarkerWithInfowindow: React.FC<MarkerWithInfowindowProps> = ({ position, infoContent }) => {
  return (
    <InfoWindow position={position} maxWidth={400}>
      <div className="info-window">
        <h1>{infoContent}</h1>
        <p>
          This is a custom info window for <strong>{infoContent}</strong>. You can customize this content further.
        </p>
        <p>
          <strong>Attribution:</strong>{' '}
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </p>
      </div>
    </InfoWindow>
  );
};
