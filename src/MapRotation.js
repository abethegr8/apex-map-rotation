// src/MapRotation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.API_KEY; // Replace with your API key from https://apexlegendsapi.com/
const apiUrl = 'https://api.mozambiquehe.re/maprotation';

const MapRotation = () => {
  const [mapRotationData, setMapRotationData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            auth: apiKey,
            version: 2,
          },
        });
        setMapRotationData(response.data);
      } catch (error) {
        console.error('Error fetching map rotation data:', error);
      }
    }

    fetchData();
  }, []);

  if (!mapRotationData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Apex Legends Map Rotation</h1>
      {Object.entries(mapRotationData).map(([key, value]) => (
        <div key={key}>
          <h2>{key}</h2>
          <div>
            <h3>Current Map: {value.current.map}</h3>
            <p>Remaining time: {value.current.remainingMins} minutes.</p>
            <h3>Next Map: {value.next.map}</h3>
            <p>Starts in: {value.current.remainingMins} minutes.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapRotation;
