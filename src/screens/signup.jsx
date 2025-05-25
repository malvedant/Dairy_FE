import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import signupImg from "../assetes/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import api from "../api/api";
import { PushSpinner } from "react-spinners-kit";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext); // Assuming backendUrl is being passed from context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Start loading spinner
    try {
      const D_owner_id="ownid";
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
        phone,
        role,
        D_owner_id,
      });
      setLoading(false); // Stop loading spinner

      if (data.success) {
        toast.success(data.message);
        navigate("/"); // Navigate to home page after successful registration
      } else {
        toast.error(data.message); // Show error message if registration failed
      }
    } catch (error) {
      setLoading(false); // Stop loading spinner
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
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
        <strong>Hey User, Fill the Signup Form Below</strong>
      </h2>
      <div className="container p-3">
        <form
          className="d-flex p-3 container rounded position-relative"
          style={{ zIndex: 2 }}
          onSubmit={onSubmitHandler} // Handle form submission
        >
          <div data-aos="fade-right" className="container col-md-7">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fName"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
              />
              <label htmlFor="fName"> Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="mobileNumber"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Update phone state
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <label htmlFor="email">Email Id</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
              <label htmlFor="password">Set Password</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)} // Update role state
              >
                <option value="" disabled>
                  Select Role
                </option>
               
                <option value="dairy-owner">Dairy Owner</option>
              </select>
              <label htmlFor="role">Select Role</label>
            </div>

            <p className="text-end">
              <Link to="/" style={{ color: "red", textDecoration: "none" }}>
                Already Have an Account?
              </Link>
            </p>

            <div className="text-center my-2">
              <button
                id="signupButton"
                className="btn btn-success w-75 text-center"
                type="submit" // Use type="submit" to trigger form submission
              >
                {loading ? (
                  <div className="container d-flex justify-content-center align-items-center">
                    <PushSpinner size={30} color="white" />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
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

export default Signup;
