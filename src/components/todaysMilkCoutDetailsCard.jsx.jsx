import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const TodaysMilkCountDetailsCard = ({}) => {
  const { getTodaysMilkCountDetails, todaysMilkData } = useContext(AppContext);
  const [milkData, setMilkData] = useState([]);
  const [totalMilkPrice, setTotalMilkPrice] = useState(null);
  const [totalMilkCount, setTotalMilkCount] = useState(null);
  useEffect(() => {
    getTodaysMilkCountDetails();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("todaysMilkData");
    if (storedData) {
      setMilkData(JSON.parse(storedData));
    }
  }, [todaysMilkData]);

  

  return (
    <div className="container d-flex flex-column gap-2  rounded shadow p-3 border border-none vh-100">
      <div className="text-center">
        {" "}
        <h2>
          <strong>Todays Milk Count</strong>
        </h2>
      </div>
      <div className="d-flex flex-column gap-3 ">
      {milkData?.length > 0 ? (
  milkData.map((data, index) => (
    <div key={index} className="d-flex w-full rounded shadow p-2 gap-1 border border-none">
      <p>Name: <strong>{data.farmerName || "N/A"}</strong></p>
      <p>Fat: <strong>{data.fat || "N/A"}</strong></p>
      <p>Price: <strong>{data.price || "N/A"}</strong></p>
      <p>Liters: <strong>{data.liters || "N/A"}</strong></p>
      <p>Total Price: <strong>{data.total_value || "N/A"}</strong></p>
      <p>Shift: <strong>{data.shift || "N/A"}</strong></p>
    </div>
  ))
) : (
  <p>No milk data available.</p>
)}

      </div>
    </div>
  );
};

export default TodaysMilkCountDetailsCard;
