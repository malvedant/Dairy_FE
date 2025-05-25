import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PushSpinner } from "react-spinners-kit";
import UserNavbar from "../components/UserNavbar";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

function AllocateCowFeed() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(null);
  const [total_cowFeed_price, setTotal_cowFeed_price] = useState(null);
  const [allocated_bags, setAllocated_bags] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [selectedCowFeed, setSelectedCowFeed] = useState("");
  const [cowFeedName, setCowFeedName] = useState("");

  const { backendUrl, userData, farmersData,getCowFeedDetails } = useContext(AppContext);
  const cowFeedData = JSON.parse(localStorage.getItem("cowFeedData")) || [];
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    setTotal_cowFeed_price(price * allocated_bags);
  }, [price, allocated_bags]);

  useEffect(() => {
    if (selectedCowFeed) {
      const selected = cowFeedData.find((cowFeed) => cowFeed._id === selectedCowFeed);
      if (selected) {
        setPrice(selected.price);
        setCowFeedName(selected.cowFeedName);
      }
    }
  }, [selectedCowFeed]);

  const handleSubmit = async () => {
    if (!date || !price || !selectedFarmer || !selectedCowFeed || !allocated_bags) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/D_owner/allocate-cowfeed`, {
        date,
        allocated_bags,
        price,
        cowFeed_id: selectedCowFeed,
        cowFeedName,
        D_owner_id: userData.id,
        farmer_id: selectedFarmer,
        total_cowFeed_price,
      });

      if (data.success) {
        await getCowFeedDetails();
        toast.success("Cow feed allocation added successfully.");
        setDate(new Date().toISOString().split("T")[0]);
        setCowFeedName("");
        setFarmerName("");
        setSelectedFarmer("");
        setSelectedCowFeed("");
        setTotal_cowFeed_price(null);
        setAllocated_bags(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
      </div>
      <ToastContainer />
      <div className="shadow rounded m-4 p-4 d-flex flex-row">
        <div className="container col-md-7">
          <div className="form-floating mb-3">
            <select className="form-select" value={selectedFarmer} onChange={(e) => setSelectedFarmer(e.target.value)}>
              <option value="" disabled>Select Farmer</option>
              {farmersData?.map((farmer) => (
                <option key={farmer._id} value={farmer._id}>{farmer.name}</option>
              ))}
            </select>
            <label>Select Farmer</label>
          </div>

          <div className="form-floating mb-3">
            <select className="form-select" value={selectedCowFeed} onChange={(e) => setSelectedCowFeed(e.target.value)}>
              <option value="" disabled>Select Cow Feed</option>
              {cowFeedData?.map((cowFeed) => (
                <option key={cowFeed._id} value={cowFeed._id}>{cowFeed.cowFeedName}</option>
              ))}
            </select>
            <label>Select Cow Feed</label>
          </div>

          <div className="form-floating mb-3">
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Date</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" value={price} readOnly />
            <label>Price per Bag (₹)</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" value={allocated_bags} onChange={(e) => setAllocated_bags(Number(e.target.value))} />
            <label>Allocated Bags</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={total_cowFeed_price} readOnly />
            <label>Total Price (₹)</label>
          </div>

          <div className="text-center my-2">
            <button className="btn btn-success w-75" onClick={handleSubmit} disabled={loading}>
              {loading ? <PushSpinner size={30} color="white" /> : "Allocate Cow Feed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllocateCowFeed;