import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';


const FFarmersAdvancePayment = () => {
    const {  userData, backendUrl } = useContext(AppContext);
    const [advancePaymentTransactions, setAdvancePaymentTransactions] = useState([]);
    

    useEffect(() => {
       

        const getAdvancePayment = async () => {
            try {
               

                const response = await axios.post(`${backendUrl}/api/D_owner/get-farmer-advance-payment`, {
                    farmer_id:userData.id,
                   
                    D_owner_id: userData.D_owner_id,
                });

                if (response.data.success) {
                    setAdvancePaymentTransactions(response.data.data);
                   
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch milk collection data.");
            }
        };

        getAdvancePayment();
    }, [ backendUrl, userData]);

 
   

    return (
        <div>
            <h5 className="text-left mb-3">Milk Transactions</h5>
            {advancePaymentTransactions.length > 0 ? (
                <div className="table-responsive p-2">
                    <table className="table table-bordered table-striped table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                               
                                <th>Amount</th>
                                <th>Allocated Date</th>
                                <th>Emi</th>
                                <th>expire Date</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {advancePaymentTransactions.map((tx, index) => (
                                <tr key={index}>
                                    <td>{tx.farmerName}</td>
                                    <td>₹{tx.advancePayment}</td>
                                    <td>{new Date(tx.date).toISOString().split("T")[0]}</td>
                                    <td>₹{tx.monthlyEmi}</td>
                                    <td>{new Date(tx.emiExpireDate).toISOString().split("T")[0]}</td>
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

export default FFarmersAdvancePayment;
