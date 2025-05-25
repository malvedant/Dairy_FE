import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
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

const DairyData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuItems = [
    { name: "Farmer's List", content: "Farmer's list data goes here..." },
    { name: "Today's All Milk Collection", content: "Today's milk collection details..." },
    { name: "Today's All Allocated Cow Feed", content: "Allocated cow feed data..." },
    { name: "All Advance Payments", content: "Advance payments list..." },
    { name: "Milk Price History", content: "Milk price history records..." },
    { name: "milk Collection As per Date", content: "Milk price history records..." },
    { name: "cow Feed allocation As per Date", content: "Milk price history records..." },
    { name: "Payment History", content: "Payment history records..." },
    { name: "10 days Milk Collection", content: "Payment history records..." },
    { name: "10 days cowFeed Allocation", content: "Payment history records..." },
    { name: "Emi Transaction History", content: "Payment history records..." },
    { name: "cowFeed Stock", content: "Payment history records..." },
  ];

  return (
    <div>
      <UserNavbar />
      <div className='d-flex bg-white vh-100'>
        
       
        <div className='p-3 border-end bg-white' >
          <ul className='list-unstyled'>
            {menuItems.map((item, index) => (
              <li key={index} className='mb-2'>
                <button 
                  onClick={() => setCurrentIndex(index)} 
                  className={`btn w-100 text-start text-dark 
                    ${currentIndex === index ? 'btn-success text-white' : 'btn-outline-success'}`}
                  aria-current={currentIndex === index ? "page" : undefined}
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
          currentIndex===0 &&(
            <FarmerListCard/>
          )
          }
          {
             currentIndex===1 &&(
              <TodaysMilkCountDetailsCard/>
            )
          }
          
          {
             currentIndex===2 &&(
              <TodaysCowFeedDataCard/>
            )
          }
          {
             currentIndex===3 &&(
              <AdvancePaymentCard/>
            )
          }
           {
             currentIndex===4 &&(
              <MilkPriceHistoryCard/>
            )
          }
           {
             currentIndex===5 &&(
              <MilkCollectionAsPerDateCard/>
            )
          }
          
          {
             currentIndex===6 &&(
              <CowFeedAllocationAsPerDateCard/>
            )
          }
           {
             currentIndex===7 &&(
              <PaymentHistoryCard />
            )
          }
           {
             currentIndex===8 &&(
              <TenDaysMilkCollectionCard />
            )
          }
           {
             currentIndex===9 &&(
              <TenDaysCowFeedAllocationCard />
            )
          }
           {
             currentIndex===10 &&(
              <EmiTransactionCard />
            )
          }
            {
             currentIndex===11 &&(
              <FeedCard />
            )
          }
        </div>
      
      </div>
    </div>
  );
};

export default DairyData;
