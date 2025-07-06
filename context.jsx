
// context.jsx

import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBusinessData = async (name, location) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });
      const data = await res.json();
      setBusinessData(data);
    } catch (err) {
      console.error("Error fetching business data", err);
    }
    setLoading(false);
  };

  const regenerateHeadline = async (name, location) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/regenerate-headline?name=${name}&location=${location}`
      );
      const data = await res.json();
      setBusinessData((prev) => ({ ...prev, headline: data.headline }));
    } catch (err) {
      console.error("Error regenerating headline", err);
    }
    setLoading(false);
  };

  return (
    <DashboardContext.Provider
      value={{
        businessData,
        fetchBusinessData,
        regenerateHeadline,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
