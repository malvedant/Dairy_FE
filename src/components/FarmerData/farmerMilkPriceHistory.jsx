import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const FFarmersMilkPriceHistory = () => {
    const {  userData, backendUrl } = useContext(AppContext);
    const [milkTransactions, setMilkTransactions] = useState([]);
   
   

    useEffect(() => {
      

        const getTodaysMilkPrice = async () => {
            try {
               

                const response = await axios.post(`${backendUrl}/api/D_owner/get-farmer-milkPrice-history`, {
                    farmer_id: userData.id,
                  
                    D_owner_id: userData.D_owner_id,
                });

                if (response.data.success) {
                    setMilkTransactions(response.data.data);
                   
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getTodaysMilkPrice();
    }, [ backendUrl, userData]);

   

    return (
        <div>
            <h5 className="text-left mb-3">Milk Rates History</h5>
            {milkTransactions.length > 0 ? (
                <div className="table-responsive p-2">
                    <table className="table table-bordered table-striped table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Shift</th>
                                <th>Fat</th>
                                <th>Price</th>
                                
                               
                            </tr>
                        </thead>
                        <tbody>
                            {milkTransactions.map((tx, index) => (
                                <tr key={index}>
                                    <td>{tx.farmerName}</td>
                                    <td>{new Date(tx.date).toISOString().split("T")[0]}</td>
                                    <td>{tx.shift}</td>
                                    <td>{tx.fat}</td>
                                    <td>₹{tx.price}</td>
                                   
                                </tr>
                            ))}
                         
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">No transactions found.</p>
            )}
        </div>
    );
};

export default FFarmersMilkPriceHistory;
