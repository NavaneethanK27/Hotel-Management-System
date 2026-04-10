import React, { useState, useEffect, useContext } from "react";
import "./OccupiedDatesDisplay.css";
import { UserContext } from "./UserContext";

const OccupiedDatesDisplay = () => {
  const [groupedDates, setGroupedDates] = useState({});
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (!user) {
      return;
    }

    const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    async function fetchDates() {
      try {
        const response = await fetch(`${baseURL}/occupied-dates/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        console.log(user.token);
        const data = await response.json(); // Parse the JSON response
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error during fetching dates:", error);
        return []; // Return an empty array if fetch fails
      }
    }

    async function processAndSetDates() {
      const fetchedDates = await fetchDates(); // Wait for fetchDates to resolve

      // Process dates into grouped ranges
      const processDates = (dates) => {
        // Ensure dates are sorted chronologically
        const sortedEntries = dates.sort((a, b) => a.date.localeCompare(b.date));

        const ranges = {};
        let currentMonth = "";
        let currentRoom = "";
        let currentRange = null;

        sortedEntries.forEach((entry) => {
          const dateStr = entry.date;
          const roomName = entry.room_name;
          const date = new Date(`${dateStr}T00:00:00`);

          if (isNaN(date.getTime())) {
            console.error("Invalid date:", dateStr);
            return;
          }

          const month = date.toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          });

          // Check if we need to start a new range (new month, new room, or not consecutive)
          let startNew = !currentRange || month !== currentMonth || roomName !== currentRoom;
          
          if (!startNew) {
            const prevDate = new Date(`${currentRange.endDate}T00:00:00`);
            prevDate.setDate(prevDate.getDate() + 1);
            if (date.toISOString().split("T")[0] !== prevDate.toISOString().split("T")[0]) {
              startNew = true;
            }
          }

          if (startNew) {
            if (currentRange) {
              if (!ranges[currentMonth]) ranges[currentMonth] = [];
              ranges[currentMonth].push(currentRange);
            }
            currentMonth = month;
            currentRoom = roomName;
            currentRange = { 
              startDate: dateStr, 
              endDate: dateStr, 
              roomName: roomName, 
              roomType: entry.room_type 
            };
          } else {
            currentRange.endDate = dateStr;
          }
        });

        // Finalize the last range
        if (currentRange) {
          if (!ranges[currentMonth]) ranges[currentMonth] = [];
          ranges[currentMonth].push(currentRange);
        }

        return ranges;
      };

      setGroupedDates(processDates(fetchedDates));
    }

    processAndSetDates(); // Fetch and process dates
  }, [user]); // Re-run when `user` changes

  return (
    <div className="occupied-dates-container">
      {Object.keys(groupedDates).map((month) => (
        <div key={month} className="month-section">
          <h2 className="month-title">{month}</h2>
          <div className="date-cards">
            {groupedDates[month].map((range, index) => (
              <div key={index} className="date-card">
                <h4 className="room-name-display">{range.roomName}</h4>
                <p className="room-type-display">{range.roomType}</p>
                <p className="date-range">
                  {new Date(range.startDate).toLocaleDateString()} -{" "}
                  {new Date(range.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OccupiedDatesDisplay;
