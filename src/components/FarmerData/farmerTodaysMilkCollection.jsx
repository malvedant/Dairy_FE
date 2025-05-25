import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const FFarmersTodayMilkCollection = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [milkTransactions, setMilkTransactions] = useState([]);
    const [totalMilkPrice, setTotalMilkPrice] = useState(0);
    const [totalMilkCount, setTotalMilkCount] = useState(0);
    

    useEffect(() => {
       

        const getTodaysMilkCollection = async () => {
            try {
                const now = new Date();
                const istOffset = 5.5 * 60 * 60 * 1000; 
                const istTime = new Date(now.getTime() + istOffset);
                const date = istTime.toISOString().split("T")[0];

                const response = await axios.post(`${backendUrl}/api/D_owner/calculate-farmers-todays-milk-price-liters`, {
                    farmer_id: userData.id,
                    date,
                    D_owner_id: userData.D_owner_id,
                });

                if (response.data.success) {
                    setMilkTransactions(response.data.transactions);
                    setTotalMilkCount(response.data.totalMilkCount);
                    setTotalMilkPrice(response.data.totalMilkPrice);
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getTodaysMilkCollection();
    }, [ backendUrl, userData]);

   

    return (
        <div>
            <h5 className="text-left mb-3">Milk Transactions</h5>
            {milkTransactions.length > 0 ? (
                <div className="table-responsive p-2">
                    <table className="table table-bordered table-striped table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Fat</th>
                                <th>Price</th>
                                <th>Liters</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milkTransactions.map((tx, index) => (
                                <tr key={index}>
                                    <td>{tx.farmerName}</td>
                                    <td>{new Date(tx.date).toISOString().split("T")[0]}</td>
                                    <td>{tx.fat}</td>
                                    <td>₹{tx.price}</td>
                                    <td>{tx.liters}</td>
                                    <td>₹{tx.total_value}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="5" style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Final Total Milk Price: ₹{totalMilkPrice}, Final Total Milk Count: {totalMilkCount} Liters
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

export default FFarmersTodayMilkCollection;
