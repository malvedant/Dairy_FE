import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const TodaysCowFeedDataCard = () => {
  const { getTodaysCowFeedDetails, todaysCowFeedData, userData,totalCowFeedBags,totalCowFeedPrice } = useContext(AppContext);

 

 

  useEffect(() => {
    getTodaysCowFeedDetails();
  
  }, []); // Fix: Update dependency to prevent unnecessary re-renders

  return (
    <div className="container d-flex flex-column gap-2 rounded shadow p-3 border border-none vh-100">
      <div className="text-center">
        <h2>
          <strong>Today's Allocated Cow Feed</strong>
        </h2>
        <h5>
          Total CowFeed Bags: <strong>{totalCowFeedBags} Bags</strong>
        </h5>
        <h5>
          Total CowFeed Price: <strong>₹{totalCowFeedPrice}</strong>
        </h5>
      </div>
      <div className="d-flex flex-column gap-3">
        {todaysCowFeedData?.length > 0 ? (
          todaysCowFeedData.map((data, index) => (
            <div
              key={index}
              className="d-flex w-full rounded shadow p-2 gap-1 border border-none"
            >
              <p>
                Farmer Name: <strong>{data.farmerName || "N/A"}</strong>
              </p>
              <p>
                Cow Feed Name: <strong>{data.cowFeedName || "N/A"}</strong>
              </p>
              <p>
                Price: <strong>{data.price || "N/A"}</strong>
              </p>
              <p>
                Allocated Bags: <strong>{data.allocated_bags || "N/A"}</strong>
              </p>
              <p>
                Total Price: <strong>{data.total_cowFeed_price || "N/A"}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>No cow feed transaction data available.</p>
        )}
      </div>
    </div>
  );
};

export default TodaysCowFeedDataCard;
