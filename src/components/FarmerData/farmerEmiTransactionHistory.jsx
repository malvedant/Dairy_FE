import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const FFarmersEmiTransactionHistory = () => {
    const {  userData, backendUrl } = useContext(AppContext);
    const [emiTransctions, setEmiTransctions] = useState([]);
   
   

    useEffect(() => {
       

        const getEmiTransaction= async () => {
            try {
               

                const response = await axios.post(`${backendUrl}/api/D_owner/get-farmer-emiTransaction-history`, {
                    farmer_id:userData.id,
                  
                    D_owner_id: userData.D_owner_id,
                });

                if (response.data.success) {
                    setEmiTransctions(response.data.data);
                   
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getEmiTransaction();
    }, [ backendUrl, userData]);


    return (
        <div >
             <h5> Emi Transaction </h5>

{emiTransctions.length > 0 ? (
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
            Date
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Installment{" "}
          </th>
          <th
            style={{
              width: "15%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            EMI
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Total Paid
          </th>
          <th
            style={{
              width: "20%",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Remaining
          </th>
        </tr>
      </thead>
      <tbody>
        {emiTransctions.map((tx, index) => {
          const formattedDate = new Date(tx.date)
            .toISOString()
            .split("T")[0];
          return (
            <tr key={index}>
              <td className="text-center">{formattedDate}</td>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">₹{tx.monthlyEmi}</td>
              <td className="text-center">
                ₹{(tx.count ?? 0) * (tx.monthlyEmi ?? 0)}
              </td>
              <td className="text-center">
                ₹{tx.remainingAdvancePrice}
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

export default FFarmersEmiTransactionHistory;
