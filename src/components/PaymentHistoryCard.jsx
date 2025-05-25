import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

const PaymentHistoryCard = () => {
  
  const { paymentHistory , getPaymentHistory } = useContext(AppContext);

  useEffect(() => {
    getPaymentHistory();
  }, []);

  return (
    <div>
      <h5 className="text-center mb-3">Payment Transaction History</h5>
      {paymentHistory?.length > 0 ? ( // Fix: Using optional chaining
        <div className="table-responsive p-2">
          <table className="table table-bordered table-striped table-sm">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "20%", whiteSpace: "nowrap" }}>Name</th>
                <th style={{ width: "20%", whiteSpace: "nowrap" }}>Date</th>
                <th style={{ width: "15%", whiteSpace: "nowrap" }}>Total Bill</th>
                <th style={{ width: "15%", whiteSpace: "nowrap" }}>From Date</th>
                <th style={{ width: "15%", whiteSpace: "nowrap" }}>To Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((tx, index) => {
                const formattedDate = new Date(tx.date).toISOString().split("T")[0];
                const formattedFromDate = new Date(tx.fromDate).toISOString().split("T")[0];
                const formattedToDate = new Date(tx.toDate).toISOString().split("T")[0];
                return (
                  <tr key={index}>
                    <td>{tx.farmerName}</td>
                    <td>{formattedDate}</td>
                    <td>₹{tx.finalBill}</td>
                    <td>{formattedFromDate}</td>
                    <td>{formattedToDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No Payment History.</p>
      )}
    </div>
  );
};

export default PaymentHistoryCard;
