import React, { useContext } from "react";
import UserNavbar from "../components/UserNavbar";
import FFarmerServiceCard from "../components/modals/farmerServiceCard.jsx";
import { AppContext } from "../Context/AppContext.jsx";


const FarmerScreen = () => {
const {userData}=useContext(AppContext);

  return (
    <div>
      <UserNavbar />
      <div className="container  text-center">
        <h1>Hello <strong>{userData.name}</strong>,</h1>
        <h6>Welcome Back Again.</h6>
      </div>
      <FFarmerServiceCard/>
    </div>
  );
};

export default FarmerScreen;
