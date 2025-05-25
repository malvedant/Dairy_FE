import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const AdvancePaymentCard = () => {
  const { advancePaymentData } = useContext(AppContext);

  return (
    <div className="container d-flex flex-column gap-2 rounded shadow p-3 border-0 vh-100">
      <div className="text-center">
        <h4><strong>All Advance Payments</strong></h4>
      </div>
      <div className="d-flex flex-column gap-3">
        {advancePaymentData.length > 0 ? (
          advancePaymentData.map((data, index) => (
            <div key={index} className="d-flex w-full rounded shadow p-2 gap-1 border-0" style={{ fontSize: "0.9rem" }}>
              <p><strong>{data.farmerName || "N/A"}</strong></p>
              <p>Advance: ₹{data.advancePayment || "0"}</p>
              <p>Date: {data.date || "N/A"} → {data.emiExpireDate || "N/A"}</p>
              <p>EMI: ₹{data.monthlyEmi || "0"}</p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "0.9rem" }}>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancePaymentCard;
