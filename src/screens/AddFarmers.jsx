import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { PushSpinner } from "react-spinners-kit";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import signupImg from "../assetes/signup.png";// Fixed "assetes" typo
import { AppContext } from "../Context/AppContext";
import UserNavbar from "../components/UserNavbar";

function AddFarmers() {
  // ✅ State Hooks
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("farmer"); // Default role set
  const navigate = useNavigate();

  // ✅ Context Hook
  const { backendUrl, userData,getFarmersData } = useContext(AppContext); 

  // ✅ Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/D_owner/add-farmer`, {
        name,
        email,
        password,
        phone,
        role,
        D_owner_id: userData?.id, 
      });

      setLoading(false);
      if (response.data.success) {
        getFarmersData();
        toast.success(response.data.message);
        navigate("/farmers-list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
     <UserNavbar/>
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <ToastContainer />
      <h2 className="text-start my-2 mt-5">
        <strong>Fill this form for adding a new Farmer</strong>
      </h2>

      <div className="container p-3">
        <form
          className="d-flex p-3 container rounded position-relative"
          style={{ zIndex: 2 }}
          onSubmit={onSubmitHandler}
        >
          <div data-aos="fade-right" className="container col-md-7">
            {/* Name Input */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fName"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="fName"> Name</label>
            </div>

            {/* Phone Number Input */}
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="mobileNumber"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
            </div>

            {/* Email Input */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email Id</label>
            </div>

            {/* Password Input */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Set Password</label>
            </div>

            {/* Role Selection */}
            <div className="form-floating mb-3">
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="farmer">Farmer</option>
              </select>
              <label htmlFor="role">Select Role</label>
            </div>

            <p className="text-end">
              <Link to="/" style={{ color: "red", textDecoration: "none" }}>
                Already Have an Account?
              </Link>
            </p>

            {/* Submit Button */}
            <div className="text-center my-2">
              <button
                id="signupButton"
                className="btn btn-success w-75 text-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="container d-flex justify-content-center align-items-center">
                    <PushSpinner size={30} color="white" />
                  </div>
                ) : (
                  "Add Farmer"
                )}
              </button>
            </div>
          </div>

          {/* Signup Image */}
          <div data-aos="fade-left" className="container mx-auto my-auto loginImageContainer">
            <img
              id="signUpImage"
              src={signupImg}
              className="img-fluid"
              alt="Sign Up Background"
            />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AddFarmers;
