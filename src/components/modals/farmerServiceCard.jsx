import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FFarmersTodayMilkCollection from "../FarmerData/farmerTodaysMilkCollection";
import FFarmersTodayCowFeed from "../FarmerData/farmerTodaysCowFeed";
import FFarmersMilkPriceHistory from "../FarmerData/farmerMilkPriceHistory";
import FFarmersMilkCollectionAsPerDate from "../FarmerData/farmerMilkCollectionAsperDate";
import FFarmersCowFeedAsPerDate from "../FarmerData/farmerCowFeedAsPerDate";
import FFarmersPaymentHistory from "../FarmerData/farmerPaymentHistory";
import FFarmerTenDaysMilkCollection from "../FarmerData/FarmerTenDaysMilkCollection";
import FFarmerTenDaysCowFeed from "../FarmerData/farmerTenDaysCowFeed";
import FFarmersEmiTransactionHistory from "../FarmerData/farmerEmiTransactionHistory";
import FFarmersAdvancePayment from "../FarmerData/farmerAdvancePayment";
import { AppContext } from "../../Context/AppContext";

const FFarmerServiceCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {userData}=useContext(AppContext);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);

  const menuItems = [
    { name: "Today's All Milk Collection", content: "Today's milk collection details..." },
    { name: "Today's All CowFeed ", content: "Today's milk collection details..." },
   
    { name: "Milk Price History", content: "Milk price history records..." },
    { name: "milk Collection As per Date", content: "Milk price history records..." },
    { name: "cow Feed allocation As per Date", content: "Milk price history records..." },
    { name: "Payment History", content: "Payment history records..." },
    { name: "10 days Milk Collection", content: "Payment history records..." },
    { name: "10 days cowFeed Allocation", content: "Payment history records..." },
    { name: "Emi Transaction History", content: "Payment history records..." },
    { name: " Advance Payments", content: "Advance payments list..." },
  ];

  return (
    <div className='d-flex bg-white vh-100'>
      <div className='p-3 border-end bg-white'>
        <ul className='list-unstyled'>
          {menuItems.map((item, index) => (
            <li key={index} className='mb-2'>
              <button
                onClick={() => setCurrentMenuIndex(index)}
                className={`btn w-100 text-start text-dark ${
                  currentMenuIndex === index ? "btn-success text-white" : "btn-outline-success"
                }`}
                aria-current={currentMenuIndex === index ? "page" : undefined}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-grow-1 p-3'>
        {currentMenuIndex === 0 && <FFarmersTodayMilkCollection />}
        
        {currentMenuIndex === 1 && <FFarmersTodayCowFeed />}
        {currentMenuIndex === 2 && <FFarmersMilkPriceHistory />}
        {currentMenuIndex === 3 && <FFarmersMilkCollectionAsPerDate />}
        {currentMenuIndex === 4 && <FFarmersCowFeedAsPerDate />}
        {currentMenuIndex === 5 && <FFarmersPaymentHistory />}
        {currentMenuIndex === 6 && <FFarmerTenDaysMilkCollection />}
        {currentMenuIndex === 7 && <FFarmerTenDaysCowFeed />}
        {currentMenuIndex === 8 && <FFarmersEmiTransactionHistory/>}
        {currentMenuIndex === 9 && <FFarmersAdvancePayment/>}
      </div>
    </div>
  );
};

export default FFarmerServiceCard; 
