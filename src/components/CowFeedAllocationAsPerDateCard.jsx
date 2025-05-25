import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const CowFeedAllocationAsPerDateCard = () => {
  const {  userData } = useContext(AppContext);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [cowFeedData, setCowFeedData] = useState([]);
  
  const [totalCowFeedBags, setTotalCowFeedBags] = useState(0);
  const [totalCowFeedPrice, setTotalCowFeedPrice] = useState(0);
  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Fetching milk data for date:", date);
      const { data } = await axios.post(
       'http://localhost:4000/api/D_owner/get-All-cowfeed-transactions-asper-date',
        { D_owner_id: userData.id, date }
      );

      if (data.success) {
        await calculatedTotalCowFeedAndPrice();
        toast.success(data.message);
        setCowFeedData(data.data);
      } else {
        toast.error("No data found for this date.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const calculatedTotalCowFeedAndPrice = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/D_owner/calculate-todays-cowFeed-price-bags", {
        D_owner_id: userData.id,
        date,
      });
      if (data.success) {
        setTotalCowFeedBags(data.totalAllocatedBags);
        setTotalCowFeedPrice(data.totalcowFeedPrice);
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
          <strong>Cow Feed allocation - {date || "Select a Date"}</strong>
        </h2>
        <h5>Total CowFeed Bags: <strong><span id="totalMilkCount">{totalCowFeedBags}</span> Bags</strong></h5>
        <h5>Total CowFeed Price: <strong><span id="totalMilkCount"> ₹{totalCowFeedPrice}</span> </strong></h5>
        <div className="d-flex flex-column gap-3 ">
        {cowFeedData.length > 0 ? (
          cowFeedData.map((data, index) => (
            <div
              key={index}
              className=" d-flex  w-full rounded shadow p-2 gap-1 border border-none"
            >
              <p>
                farmer Name: <strong> {data.farmerName || "N/A"}</strong>{" "}
              </p>
              <p>
                {" "}
                cowFeedName: <strong> {data.cowFeedName || "N/A"}</strong>
              </p>
              <p>
                {" "}
                Price: <strong> {data.price || "N/A"}</strong>
              </p>
              <p>
                allocated bags: <strong> {data.allocated_bags || "N/A"}</strong>
              </p>
              <p>
                Total Price:{" "}
                <strong> {data.total_cowFeed_price || "N/A"}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>No cowFeed Transaction data available.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default CowFeedAllocationAsPerDateCard;
