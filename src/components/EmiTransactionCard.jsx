import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

const EmiTransactionCard = () => {
  
  const { getEmiTransactionHistory,
    emiTransctions, } = useContext(AppContext);

  useEffect(() => {
    getEmiTransactionHistory();
  }, []);

  return (
    <div>
      <h5 className="text-center mb-3">Payment Transaction History</h5>
      {emiTransctions?.length > 0 ? ( // Fix: Using optional chaining
        <div className="table-responsive p-2">
          <table className="table table-bordered table-striped table-sm">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "20%", whiteSpace: "nowrap" }}>Name</th>
                <th style={{ width: "20%", whiteSpace: "nowrap" }}> Emi Paid Date</th>
                <th style={{ width: "15%", whiteSpace: "nowrap" }}>Emi Price</th>
                <th style={{ width: "15%", whiteSpace: "nowrap" }}>Emi Exprire Date</th>
               
              </tr>
            </thead>
            <tbody>
              {emiTransctions.map((tx, index) => {
                const formattedDate = new Date(tx.date).toISOString().split("T")[0];
                const formattedemiExpireDate = new Date(tx.emiExpireDate).toISOString().split("T")[0];
                const formattedToDate = new Date(tx.toDate).toISOString().split("T")[0];
                return (
                  <tr key={index}>
                    <td>{tx.farmerName}</td>
                    <td>{formattedDate}</td>
                    <td>₹{tx.monthlyEmi}</td>
                    <td>{formattedemiExpireDate}</td>
                    
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

export default EmiTransactionCard;
