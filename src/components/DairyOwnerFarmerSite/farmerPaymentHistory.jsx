import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const FarmersPaymentHistory = ({ currentIndex }) => {
    const { farmersData, userData, backendUrl } = useContext(AppContext);
    const [paymentHistory, setPaymentHistory] = useState([]);
   
   

    useEffect(() => {
        if (!farmersData || !farmersData[currentIndex]) return; 

        const getPaymentHistory= async () => {
            try {
               

                const response = await axios.post(`${backendUrl}/api/D_owner/get-farmer-Paymnet-Transaction`, {
                    farmer_id: farmersData[currentIndex]._id,
                  
                    D_owner_id: userData.id
                });

                if (response.data.success) {
                    setPaymentHistory(response.data.data);
                   
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getPaymentHistory();
    }, [currentIndex, farmersData, backendUrl, userData]);

   
    if (!farmersData || !farmersData[currentIndex]) {
        return <p className="text-danger">Error: Farmer data is not available.</p>;
    }

    return (
        <div >
             <h5> Paymet History</h5>

{paymentHistory.length > 0 ? (
  <div
    className="table-responsive p-2"
  
  >
    <table
      className="table table-bordered table-striped "
      style={{ fontSize: "16px" }}
    >
      <thead className="table-dark">
        <tr>
        <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Name
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
          payment  Date
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
           Amount
          </th>
          <th
            style={{
              width: "15%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            From Date
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            To Date
          </th>
          
        </tr>
      </thead>
      <tbody>
        {paymentHistory.map((tx, index) => {
          const formattedDate = new Date(tx.date)
            .toISOString()
            .split("T")[0];
            const formattedToDate = new Date(tx.date)
            .toISOString()
            .split("T")[0];
            const formattedFromDate = new Date(tx.date)
            .toISOString()
            .split("T")[0];
          return (
            <tr key={index}>
                <td className="text-center">{tx.farmerName}</td>
              <td className="text-center">{formattedDate}</td>
              <td className="text-center">₹{tx.finalBill}</td>
             
              <td className="text-center">
                {formattedFromDate}
              </td>
              <td className="text-center">
                {formattedToDate}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-center text-muted">No transactions found.</p>
)}
        </div>
    );
};

export default FarmersPaymentHistory;
