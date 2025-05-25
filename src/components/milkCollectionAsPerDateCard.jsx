import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MilkCollectionAsPerDateCard = () => {
  const {  userData } = useContext(AppContext);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [milkData, setMilkData] = useState([]);
  const [totalMilkCount, setTotalMilkCount] = useState(0);
  const [totalMilkPrice, setTotalMilkPrice] = useState(0);

  const backendUrl="http://localhost:4000/api/D_owner/get-All-milk-transactions-asper-date"

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Fetching milk data for date:", date);
      const { data } = await axios.post(
       'http://localhost:4000/api/D_owner/get-All-milk-transactions-asper-date',
        { D_owner_id: userData.id, date }
      );

      if (data.success) {
        await calculatedTotalMilkCountAndPrice();
        toast.success(data.message);
        setMilkData(data.data);
      } else {
        toast.error("No data found for this date.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  const calculatedTotalMilkCountAndPrice = async () => {
      try {
        const { data } = await axios.post("http://localhost:4000/api/D_owner/calculate-todays-milk-price-liters", {
          D_owner_id: userData.id,
          date,
        });
        if (data.success) {
          setTotalMilkCount(data.totalMilkCount);
          setTotalMilkPrice(data.totalMilkPrice);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div className="container min-vh-100">
      {/* Date Input Field */}
      <div className="form-floating mb-3">
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
        />
        <label htmlFor="date">Select Date</label>
      </div>

      {/* Search Button */}
      <div className="text-center my-2">
        <button
          id="submitButton"
          className="btn btn-success w-75"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Milk Collection Data */}
      <div className="container p-3">
        <h2 className="text-center">
          <strong>Milk Collection - {date || "Select a Date"}</strong>
        </h2>

        <h5>Total Milk: <strong><span id="totalMilkCount">{totalMilkCount}</span> Liters</strong></h5>
        <h5>Total Milk Price: <strong><span id="totalMilkCount"> ₹{totalMilkPrice}</span> </strong></h5>

       
        <div className="d-flex flex-column gap-3 ">
      
      {milkData.length > 0 ? (
        milkData.map((data, index) => (
          <div key={index} className=" d-flex  w-full rounded shadow p-2 gap-1 border border-none">
            <p>Name: <strong> {data.farmerName || "N/A"}</strong> </p>
            <p> Fat: <strong> {data.fat || "N/A"}</strong></p>
            <p> Price: <strong> {data.price || "N/A"}</strong></p>
            <p>Liters: <strong> {data.liters || "N/A"}</strong></p>
            <p>Total Price:  <strong> {data.total_value || "N/A"}</strong></p>
            <p>Shift: <strong> {data.shift || "N/A"}</strong></p>
          </div>
        ))
      ) : (
        <p>No milk data available.</p>
      )}
      </div>
      </div>
    </div>
  );
};

export default MilkCollectionAsPerDateCard;
