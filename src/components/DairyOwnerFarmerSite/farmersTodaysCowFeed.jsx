import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const  FarmersTodayCowFeed = ({ currentIndex }) => {
    const { farmersData, userData, backendUrl } = useContext(AppContext);
    const [cowFeedTransactions, setCowFeedTransactions] = useState([]);
    const [total_CowFeedPrice, setTotal_CowFeedPrice] = useState(0);
    const [total_CowFeedBags, setTotal_CowFeedBags] = useState(0);
    console.log(currentIndex);
    console.log(farmersData);

    useEffect(() => {
        if (!farmersData || !farmersData[currentIndex]) return; // Ensure farmerData is available

        const getTodaysMilkCollection = async () => {
            try {
                const now = new Date();
                const istOffset = 5.5 * 60 * 60 * 1000; 
                const istTime = new Date(now.getTime() + istOffset);
                const date = istTime.toISOString().split("T")[0];

                const response = await axios.post(`${backendUrl}/api/D_owner/calculate-farmers-todays-cowFeed-price-bags`, {
                    farmer_id: farmersData[currentIndex]._id,
                    date,
                    D_owner_id: userData.id
                });

                if (response.data.success) {
                    setCowFeedTransactions(response.data.transactions);
                    setTotal_CowFeedPrice(response.data.totalcowFeedPrice);
                    setTotal_CowFeedBags(response.data.totalAllocatedBags);
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getTodaysMilkCollection();
    }, [currentIndex, farmersData, backendUrl, userData]);

    // Safe check AFTER useEffect
    if (!farmersData || !farmersData[currentIndex]) {
        return <p className="text-danger">Error: Farmer data is not available.</p>;
    }

    return (
        <div>
             <h5 className="text-left mb-3">Cow Feed Transactions</h5>
          {cowFeedTransactions.length > 0 ? (
            <div className="table-responsive p-2">
              <table className="table table-bordered table-striped table-sm">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "20%", whiteSpace: "nowrap" }}>Date</th>
                    <th style={{ width: "25%", whiteSpace: "nowrap" }}>
                      Feed Name
                    </th>
                    <th style={{ width: "10%", whiteSpace: "nowrap" }}>Bags</th>
                    <th style={{ width: "15%", whiteSpace: "nowrap" }}>
                      Price
                    </th>
                    <th style={{ width: "20%", whiteSpace: "nowrap" }}>
                      Total Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cowFeedTransactions.map((tx, index) => {
                    const formattedDate = new Date(tx.date)
                      .toISOString()
                      .split("T")[0];
                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>{tx.cowFeedName}</td>
                        <td>{tx.allocated_bags}</td>
                        <td>₹{tx.price}</td>
                        <td>₹{tx.total_cowFeed_price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td
                      colSpan="5"
                      className="border border-1 p-2"
                      style={{
                        height: "50px",
                        fontWeight: "bold",
                        textAlign: "left",
                        fontSize: "16px",
                      }}
                    >
                      Final Total CowFeed Price: ₹{total_CowFeedPrice}    , Final Total CowFeed bags: {total_CowFeedBags}   bags
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No transactions found.</p>
          )}
        </div>
    );
};

export default FarmersTodayCowFeed;
