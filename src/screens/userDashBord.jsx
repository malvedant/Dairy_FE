import React, { useState, useContext } from 'react';
import ServicesCard from '../components/ServicesCard';
import Footer from '../components/Footer';
import UserNavbar from '../components/UserNavbar';
import AdminServicesCard from '../components/AdminServiceCard';
import { AppContext } from '../Context/AppContext';

function UserDashBord() {
    const { userData } = useContext(AppContext);
    const [balance, setBalance] = useState("****.**");

    if (!userData) {
        return null; // Return nothing if userData is not available
    }

    return (
        <div className="container-fluid text-center">
            <UserNavbar />
            <div className="container">
                <h1>Hello <strong>{userData.name}</strong>,</h1>
                <h6>Welcome Back Again.</h6>
            </div>
            <AdminServicesCard/>
            <Footer/>

           
        </div>
    );
}

export default UserDashBord;
