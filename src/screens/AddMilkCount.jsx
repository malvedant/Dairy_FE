import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PushSpinner } from "react-spinners-kit";
import UserNavbar from "../components/UserNavbar";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import TodaysMilkCountDetailsCard from "../components/todaysMilkCoutDetailsCard.jsx";

function AddMilkCount() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [fat, setFat] = useState("");
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [liters, setLiters] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [shift, setShift] = useState("Morning");
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [todaysMilkdata, setTodaysMilkdata] = useState("");

  const { backendUrl, userData, farmersData, getTodaysMilkCountDetails } =
    useContext(AppContext);
  const navigate = useNavigate();

  const getTodaysMilkPrice = async () => {
    try {
      console.log(date, userData.id);

      const { data } = await axios.post(
        `${backendUrl}/api/D_owner/get-todays-milkprice`,
        {
          date: date,
          D_owner_id: userData.id,
        }
      );

      if (data.success) {
        setPrice(data.data);
        setRate(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching price"
      );
    }
  };

  useEffect(() => {
    if (date) {
      getTodaysMilkPrice();
    }
  }, [date]);

  useEffect(() => {
    setTotalValue((parseFloat(price) || 0) * (parseFloat(liters) || 0));
  }, [price, liters]);

  const handleSubmit = async () => {
    await getTodaysMilkCountDetails();
    if (!date || !fat || !price || !selectedFarmer || !liters) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/D_owner/add-farmer-milkcount`,
        {
          date,
          fat,
          price,
          liters,
          shift,
          D_owner_id: userData.id,
          farmer_id: selectedFarmer,
          total_value: totalValue,
        }
      );

      if (data.success) {
        toast.success("Milk count added successfully.");
        setDate("");
        setFat("");
        setLiters("");
        setFarmerName("");
        setSelectedFarmer("");
        setTotalValue(0);
        setShift("Morning");
        await getTodaysMilkCountDetails();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />

      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <ToastContainer />

      <div className="shadow rounded m-4 p-4 d-flex flex-row">
        <div className="container">
          <div className="container col-md-7">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={selectedFarmer}
                onChange={(e) => {
                  const selected = farmersData.find(
                    (farmer) => farmer._id === e.target.value
                  );
                  setSelectedFarmer(e.target.value);
                  setFarmerName(selected ? selected.name : "");
                }}
              >
                <option value="" disabled>
                  Select Farmer
                </option>
                {farmersData?.map((farmer) => (
                  <option key={farmer._id} value={farmer._id}>
                    {farmer.name}
                  </option>
                ))}
              </select>
              <label htmlFor="farmerDropdown">Select Farmer</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
              <label htmlFor="shiftDropdown">Select Shift</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="date">Date</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Fat Percentage"
                value={fat}
                onChange={(e) => {
                  setPrice(parseInt(e.target.value) * rate);
                  setFat(e.target.value);
                }}
              />
              <label htmlFor="fat">Fat %</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Milk Rate"
                value={price}
                readOnly
              />
              <label htmlFor="milkRate">Milk Rate</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Milk In Liters"
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
              />
              <label htmlFor="milkQuantity">Milk In Liters</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={totalValue}
                readOnly
              />
              <label htmlFor="totalValue">Total Value (₹)</label>
            </div>

            <div className="text-center my-2">
              <button
                id="submitButton"
                className="btn btn-success w-75 text-center"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="container d-flex justify-content-center align-items-center">
                    <PushSpinner size={30} color="white" />
                  </div>
                ) : (
                  "Add Data"
                )}
              </button>
            </div>
          </div>
        </div>

        <TodaysMilkCountDetailsCard todaysMilkdata />

        <div></div>
      </div>
    </div>
  );
}

export default AddMilkCount;
