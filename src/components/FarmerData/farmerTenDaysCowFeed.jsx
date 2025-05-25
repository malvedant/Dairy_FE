import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { PushSpinner } from "react-spinners-kit";
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';


const FFarmerTenDaysCowFeed = () => {
    const [toDate, setToDate] = useState('');
    const{userData}=useContext(AppContext);
    const [cowFeedTransactions, setCowFeedTransactions] = useState([]);
    const [total_CowFeedBags, setTotal_CowFeedBags] = useState(0);
    const [total_CowFeedPrice, setTotal_CowFeedPrice] = useState(0);

    const [fromDate, setFromDate] = useState('');
    const[loading,setLoading]=useState(false);
    const handleSubmit=async()=>{
        try{
            
                const { data } = await axios.post("http://localhost:4000/api/D_owner/get-farmer-Ten-Days-cowFeed", {
                  D_owner_id: userData.D_owner_id,
                  farmer_id:userData.id,
                  fromDate,
                  toDate,
                });
                if (data.success) {
                  setCowFeedTransactions(data.transactions);
                  setTotal_CowFeedBags(data.totalCowFeedBags);
                  setTotal_CowFeedPrice(data.totalCowFeedPrice);
                 
                  
                }
        }
        catch(error){
     toast.error(error.message);
        }

    }
  return (
    <div>
        <div>
      
      <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>From Date</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <label>To Date</label>
          </div>

          <div className="text-center my-2 d-flex gap-4">
           
              <button
                className="btn btn-success w-75"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <PushSpinner size={30} color="white" />
                ) : (
                  "Find "
                )}
              </button>
            
            </div>
            </div>
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
    </div>
  )
}

export default FFarmerTenDaysCowFeed;
