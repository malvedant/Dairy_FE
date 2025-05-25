import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";



import FarmerListCard from '../components/modals/FarmerListCard';
import TodaysMilkCountDetailsCard from '../components/todaysMilkCoutDetailsCard.jsx';
import TodaysCowFeedDataCard from '../components/todaysCowFeedDataCard.jsx';
import AdvancePaymentCard from "../components/AdvancePaymentCard.jsx";
import MilkPriceHistoryCard from '../components/MilkPriceHistoryCard.jsx';
import MilkCollectionAsPerDateCard from '../components/milkCollectionAsPerDateCard.jsx';
import CowFeedAllocationAsPerDateCard from '../components/CowFeedAllocationAsPerDateCard.jsx';
import PaymentHistoryCard from '../components/PaymentHistoryCard.jsx';
import TenDaysMilkCollectionCard from '../components/TenDaysMilkCollectionCard.jsx';
import TenDaysCowFeedAllocationCard from '../components/TenDaysCowFeedAllocationCard.jsx';
import EmiTransactionCard from '../components/EmiTransactionCard.jsx';
import FeedCard from "../components/CowFeedCard";
import FarmersTodayMilkCollection from "../components/DairyOwnerFarmerSite/farmersTodayMilkCollection.jsx";
import FarmersTodayCowFeed from "../components/DairyOwnerFarmerSite/farmersTodaysCowFeed.jsx";
import FarmersMilkPriceHistory from "../components/DairyOwnerFarmerSite/farmersMilkPriceHistory.jsx";

import { useState } from "react";
import FarmersMilkCollectionAsPerDate from "../components/DairyOwnerFarmerSite/farmersMilkCollectonAsPerDate.jsx";
import FarmersCowFeedAsPerDate from "../components/DairyOwnerFarmerSite/farmersCowFeedAsPerDate.jsx";
import FarmersEmiTransactionHistory from "../components/DairyOwnerFarmerSite/farmerEmiTransactionHistory.jsx";
import FarmerTenDaysMilkCollection from "../components/DairyOwnerFarmerSite/farmerTenDaysMilkTransaction.jsx";
import FarmerTenDaysCowFeed from "../components/DairyOwnerFarmerSite/farmerTenDaysCowFeed.jsx";
import FarmersAdvancePayment from "../components/DairyOwnerFarmerSite/farmerAdvancePayment.jsx";
import FarmersPaymentHistory from "../components/DairyOwnerFarmerSite/farmerPaymentHistory.jsx";

const FarmersData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { farmersData } = useContext(AppContext);
 
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
  const currentIndex = location.state?.currentIndex;

  // Validate index
  if (currentIndex === undefined || currentIndex < 0 || currentIndex >= farmersData.length) {
    toast.error("Invalid Farmer Index!");
    navigate("/farmers"); // Redirect if index is not valid
    return null;
  }

  const farmer = farmersData[currentIndex];

  const menuItems = [
   
    { name: "Today's All Milk Collection", content: "Today's milk collection details..." },
    { name: "Today's All Allocated Cow Feed", content: "Allocated cow feed data..." },
    { name: " Advance Payments", content: "Advance payments list..." },
    { name: "Milk Price History", content: "Milk price history records..." },
    { name: "milk Collection As per Date", content: "Milk price history records..." },
    { name: "cow Feed allocation As per Date", content: "Milk price history records..." },
    { name: "Payment History", content: "Payment history records..." },
    { name: "10 days Milk Collection", content: "Payment history records..." },
    { name: "10 days cowFeed Allocation", content: "Payment history records..." },
    { name: "Emi Transaction History", content: "Payment history records..." },
   
  ];

  return (
    <div>
    <div className="container d-flex mt-4 gap-4">
      <h4>Farmer Details</h4>
      <p><strong>Name:</strong> {farmer.name}</p>
      <p><strong>Phone:</strong> {farmer.phone}</p>
      <p><strong>Email:</strong> {farmer.email}</p>
      <p><strong>Role:</strong> {farmer.role}</p>

      
    </div>
     <div className='d-flex bg-white vh-100'>
        
       
     <div className='p-3 border-end bg-white' >
       <ul className='list-unstyled'>
         {menuItems.map((item, index) => (
           <li key={index} className='mb-2'>
             <button 
               onClick={() => setCurrentMenuIndex(index)} 
               className={`btn w-100 text-start text-dark 
                 ${currentMenuIndex === index ? 'btn-success text-white' : 'btn-outline-success'}`}
               aria-current={currentMenuIndex === index ? "page" : undefined}
             >
               {item.name}
             </button>
           </li>
         ))}
       </ul>
     </div>
     
     {/* Content Display */}
     <div className='flex-grow-1 p-3'>
     
       {
       currentMenuIndex===0 &&(
        <FarmersTodayMilkCollection currentIndex={currentIndex} />

       )
       }
     
       
       {
          currentMenuIndex===1 &&(
           <FarmersTodayCowFeed currentIndex={currentIndex}/>
         )
       }
       
       {
          currentMenuIndex===2 &&(
           <FarmersAdvancePayment currentIndex={currentIndex}/>
         )
       }
      
        {
          currentMenuIndex===3 &&(
           <FarmersMilkPriceHistory currentIndex={currentIndex}/>
         
         )
       }
        {
          currentMenuIndex===4 &&(
           <FarmersMilkCollectionAsPerDate currentIndex={currentIndex} />
         )
       }
       
       {
          currentMenuIndex===5 &&(
           <FarmersCowFeedAsPerDate currentIndex={currentIndex}/>
         )
       }
        {
          currentMenuIndex===6 &&(
           <FarmersPaymentHistory currentIndex={currentIndex}/>
         )
       }
        {
          currentMenuIndex===7 &&(
           <FarmerTenDaysMilkCollection currentIndex={currentIndex}/>
         )
       }
        {
          currentMenuIndex===8 &&(
           <  FarmerTenDaysCowFeed currentIndex={currentIndex}/>
         )
       }
     
        {
          currentMenuIndex===9 &&(
           <FarmersEmiTransactionHistory currentIndex={currentIndex} />
         )
       }
      
       
     </div>
   
   </div>
   </div>
  );
};

export default FarmersData;
