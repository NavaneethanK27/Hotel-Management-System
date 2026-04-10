import React from "react";
import "./AllRooms.css";
import RoomCard from "./RoomDetails/RoomCard";
import { useState, useEffect } from "react";
const AllRooms = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    async function fetchRoomData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(
          `${apiUrl}/rooms/`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch room data.");
        }

        const data = await response.json(); // Parse the JSON response

        console.log("Fetching successful:", data);
        setRoomData(data);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
    fetchRoomData();
  }, []);
  return (
    <div className="all-rooms-container">
      <h2>All Rooms</h2>
      <div className="rooms-list">
        {roomData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
