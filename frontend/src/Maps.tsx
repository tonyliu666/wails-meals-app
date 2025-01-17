'use client'
import React, {useState} from 'react';
import "./maps.css";

import {Marker,AdvancedMarker,InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';

export const MarkerWithInfowindow = () => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  
  return (
    <>
        <InfoWindow position={{ lat: 24.7864938, lng: 121.0188275 }} maxWidth={400}>
        <div style={{ color: 'black' }}>
                <h1>Uluru</h1>
                <p>
                Uluru, also referred to as Ayers Rock, is a large sandstone rock formation
                in the southern part of the Northern Territory, central Australia. It
                lies 335 km (208 mi) southwest of the nearest large town, Alice Springs;
                450 km (280 mi) by road.
                </p>
                <p>
                <strong>Attribution:</strong>{' '}
                <a
                    href="https://en.wikipedia.org/wiki/Uluru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Uluru
                </a>{' '}
                (last visited January 17, 2025).
                </p>
            </div>
        </InfoWindow>;
            
        <Marker
            position={{lat: 24.7864938, lng: 121.2288275}}
            clickable={true}
            onClick={() => alert('marker was clicked!')}
            title={'clickable google.maps.Marker'}
        />
    </>
  );
};